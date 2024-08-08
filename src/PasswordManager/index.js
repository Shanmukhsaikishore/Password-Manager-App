import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const bgColors = [
  'bg-1',
  'bg-2',
  'bg-3',
  'bg-4',
  'bg-5',
  'bg-6',
  'bg-7',
  'bg-8',
  'bg-9',
]

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    user: '',
    password: '',
    isChecked: false,
    searchText: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({user: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickCheckBox = event => {
    this.setState({isChecked: event.target.checked})
  }

  onChangeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {user, website, password} = this.state
    if (user === '' || website === '' || password === '') return
    const newPassword = {
      id: uuidv4(),
      websiteName: website,
      userName: user,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      user: '',
      password: '',
    }))
  }

  onDeletePassword = uid => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachItem => eachItem.id !== uid,
      ),
    }))
  }

  render() {
    const {passwordsList, website, user, password, isChecked, searchText} =
      this.state

    const filteredList = passwordsList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchText.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="top-card-container">
          <form className="form-container" onSubmit={this.onAddPassword}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-item">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo"
                />
              </div>
              <input
                type="text"
                className="input-box"
                value={website}
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-item">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo"
                />
              </div>
              <input
                type="text"
                className="input-box"
                value={user}
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-item">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo"
                />
              </div>
              <input
                type="password"
                value={password}
                onChange={this.onChangePassword}
                className="input-box"
                placeholder="Enter Password"
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="image"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sm-image"
          />
        </div>
        <div className="bottom-card-container">
          <div className="search-container">
            <div className="text-content">
              <h1 className="bottom-heading">Your Passwords</h1>
              <p className="count">{passwordsList.length}</p>
            </div>
            <div className="search-item">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-logo"
                />
              </div>
              <input
                type="search"
                className="input-box"
                placeholder="Search"
                value={searchText}
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="show-password-container">
            <input
              type="checkbox"
              id="check"
              className="check-box"
              onChange={this.onClickCheckBox}
            />
            <label htmlFor="check" className="para">
              Show Passwords
            </label>
          </div>
          {filteredList.length !== 0 ? (
            <ul className="list-container">
              {filteredList.map(eachItem => (
                <PasswordItem
                  key={eachItem.id}
                  passwordDetails={eachItem}
                  bgColor={
                    bgColors[
                      (eachItem.userName.length +
                        eachItem.password.length +
                        eachItem.websiteName.length) %
                        bgColors.length
                    ]
                  }
                  isChecked={isChecked}
                  onDeletePassword={this.onDeletePassword}
                />
              ))}
            </ul>
          ) : (
            <div className="hidden-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-image"
              />
              <p className="bottom-heading">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
