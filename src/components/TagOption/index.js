import './index.css'

const TagOption = props => {
  const {tag} = props
  const {optionId, displayText} = tag
  return <option value={optionId}>{displayText}</option>
}

export default TagOption
