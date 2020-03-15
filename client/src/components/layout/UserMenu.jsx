import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'
import Config from '../../config'

export default function UserMenu({anchorEl, handleClose, me}) {

  return (
    <div>
      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {me ?
          <MenuItem component="a" href={Config.serverRoutes.logoutUrl} onClick={handleClose}>Logout</MenuItem>
          : <MenuItem component={Link} to={Config.routes.login} onClick={handleClose}>Login</MenuItem>
        }
      </Menu>
    </div>
  )
}