import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagOption from '../TagOption'
import TaskItem from '../TaskItem'
import TabItem from '../TabItem'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Tasks extends Component {
  state = {
    taskInput: '',
    selectedTagInput: tagsList[0].optionId,
    taskList: [],
    activeTabId: '',
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeSelectOption = event => {
    this.setState({selectedTagInput: event.target.value})
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {taskInput, selectedTagInput} = this.state

    const selectedTag = tagsList.filter(
      eachTag => eachTag.optionId === selectedTagInput,
    )
    const tagText = selectedTag[0].displayText
    const newTask = {
      id: uuidv4(),
      task: taskInput,
      tagText,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      taskInput: '',
      selectedTagInput: tagsList[0].optionId,
    }))
  }

  getFilteredTasks = () => {
    const {activeTabId, taskList} = this.state
    let filteredTasks
    if (activeTabId === '') {
      filteredTasks = taskList
    } else {
      const activeTab = tagsList.filter(
        eachTag => eachTag.optionId === activeTabId,
      )
      const activeTabText = activeTab[0].displayText
      filteredTasks = taskList.filter(
        eachTask => eachTask.tagText === activeTabText,
      )
    }
    return filteredTasks
  }

  renderEmptyView = () => (
    <div className="empty-view-container">
      <p className="no-tasks-description">No Tasks Added Yet</p>
    </div>
  )

  onChangeTabStatus = id => {
    const {activeTabId} = this.state
    if (activeTabId === '' || activeTabId !== id) {
      this.setState({activeTabId: id})
    } else if (activeTabId === id) {
      this.setState({activeTabId: ''})
    }
  }

  render() {
    const {taskInput, selectedTagInput, taskList, activeTabId} = this.state
    const filteredTasks = this.getFilteredTasks()
    return (
      <div className="app-container">
        <form className="form-container" onSubmit={this.onSubmitTask}>
          <h1 className="app-heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="taskInput" className="label-text">
              Task
            </label>
            <input
              placeholder="Enter the task here"
              className="input-field"
              value={taskInput}
              onChange={this.onChangeTaskInput}
              id="taskInput"
            />
          </div>
          <div className="input-container">
            <label htmlFor="tagInput" className="label-text">
              Tags
            </label>
            <select
              value={selectedTagInput}
              className="select-option"
              id="tagInput"
              onChange={this.onChangeSelectOption}
            >
              {tagsList.map(eachTag => (
                <TagOption key={eachTag.optionId} tag={eachTag} />
              ))}
            </select>
          </div>
          <button type="submit" className="add-btn">
            Add Task
          </button>
        </form>
        <div className="tasks-container">
          <h1 className="tasks-heading">Tags</h1>
          <ul className="tabs-container">
            {tagsList.map(eachTag => (
              <TabItem
                key={eachTag.optionId}
                tab={eachTag}
                activeTabId={activeTabId}
                onChangeTabStatus={this.onChangeTabStatus}
              />
            ))}
          </ul>
          <h1 className="tasks-heading">Tasks</h1>
          {taskList.length === 0 ? (
            this.renderEmptyView()
          ) : (
            <ul className="tasks-list-container">
              {filteredTasks.map(eachTask => (
                <TaskItem key={eachTask.id} taskItem={eachTask} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Tasks
