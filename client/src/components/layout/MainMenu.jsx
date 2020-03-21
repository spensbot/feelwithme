import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'
import Config from '../../config'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { setTheme } from '../../localCache'
import gql from 'graphql-tag' 

const READ_THEME = gql`{
  theme
}`

export default function MainMenu({handleClose, anchorEl, me}) {

  const client = useApolloClient();

  const {data} = useQuery(READ_THEME);

  const themeText = (data.theme === 'LIGHT') ? 'Dark Mode' : 'Light Mode'

  function handleThemeClick(e){
    handleClose(e.currentTarget)

    const newTheme = (data.theme === 'LIGHT') ? 'DARK' : 'LIGHT'

    setTheme(client, newTheme)
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