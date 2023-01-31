import './index.css'

const TabItem = props => {
  const {tab, activeTabId, onChangeTabStatus} = props
  const {optionId, displayText} = tab
  const activeClass = optionId === activeTabId ? 'active' : ''
  const onClickTab = () => {
    onChangeTabStatus(optionId)
  }
  return (
    <li className="tab">
      <button
        type="button"
        className={`tab-btn ${activeClass}`}
        onClick={onClickTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
