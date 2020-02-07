import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Config from '../../config'

function UserMenu({anchorEl, handleClose, user}) {

  return (
    <div>
      <Menu
        id="main-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user ?
          <MenuItem component="a" href={Config.serverRoutes.logoutUrl} onClick={handleClose}>Logout</MenuItem>
          : <MenuItem component={Link} to={Config.routes.login} onClick={handleClose}>Login</MenuItem>
        }
      </Menu>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.mainUser.user
  }
}

export default connect(
  mapStateToProps
)(UserMenu)

