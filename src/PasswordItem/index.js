import './index.css'

const PasswordItem = props => {
  const {passwordDetails, bgColor, isChecked, onDeletePassword} = props
  const {id, userName, websiteName, password} = passwordDetails
  const deletePassword = () => {
    onDeletePassword(id)
  }
  return (
    <li className="list-item">
      <div className="profile">
        <p className={`profile-name ${bgColor}`}>
          {websiteName[0].toUpperCase()}
        </p>
        <div className="text-container">
          <p className="website">{websiteName}</p>
          <p className="username">{userName}</p>
          {isChecked ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="star-image"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="del-button"
        data-testid="delete"
        onClick={deletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="del-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
