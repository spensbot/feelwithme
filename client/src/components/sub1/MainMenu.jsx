import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Config from '../../config'
import { setTheme } from '../../redux/actions'

function MainMenu({handleClose, anchorEl, darkTheme, user, setTheme}) {

  const themeText = darkTheme ? 'Light Mode' : 'Dark Mode'

  function handleThemeClick(e){
    handleClose(e.currentTarget)
    setTheme(!darkTheme)
  }

  return (
    <div>
      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user ? <MenuItem component={Link} to={Config.routes.users + user._id} onClick={handleClose}>Profile</MenuItem> : null}
        <MenuItem component={Link} to={Config.routes.messages} onClick={handleClose}>Messages</MenuItem>
        <MenuItem component={Link} to={Config.routes.about} onClick={handleClose}>About</MenuItem>
        <MenuItem onClick={handleThemeClick}>{themeText}</MenuItem>
      </Menu>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    darkTheme: state.darkTheme,
    user: state.mainUser.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTheme: darkTheme => dispatch(setTheme(darkTheme))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (MainMenu)




