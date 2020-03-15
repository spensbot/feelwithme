import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'
import Config from '../../config'

export default function MainMenu({handleClose, anchorEl, darkTheme, me, setTheme}) {

  const themeText = darkTheme ? 'Light Mode' : 'Dark Mode'

  function handleThemeClick(e){
    handleClose(e.currentTarget)
    //setTheme(!darkTheme)
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
        {me ? <MenuItem component={Link} to={Config.routes.users + me.id} onClick={handleClose}>Profile</MenuItem> : null}
        <MenuItem component={Link} to={Config.routes.messages} onClick={handleClose}>Messages</MenuItem>
        <MenuItem component={Link} to={Config.routes.about} onClick={handleClose}>About</MenuItem>
        <MenuItem onClick={handleThemeClick}>{themeText}</MenuItem>
      </Menu>
    </div>
  )
}