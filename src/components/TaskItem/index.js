import './index.css'

const TaskItem = props => {
  const {taskItem} = props
  const {task, tagText} = taskItem
  return (
    <li className="task-item">
      <p className="task-input">{task}</p>
      <p className="tag-text">{tagText}</p>
    </li>
  )
}

export default TaskItem
