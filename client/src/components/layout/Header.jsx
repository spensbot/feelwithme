import React, { useState }  from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar'
import MainMenu from './MainMenu'
import UserMenu from './UserMenu'
import tags from '../../gqlTags'
import {useQuery} from '@apollo/react-hooks'
import MessagesButton from './MessagesButton'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: 'rgb(205, 40, 95)',
    padding: '0 16px'
    //backgroundColor: 'rgb(220, 45, 105)'
  },
  menuButton: {
    //marginRight: theme.spacing(1),
    margin: '-10px',
    width: '2rem',
    height: '2rem'
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontFamily: 'Dancing Script, Cursive',
    fontSize: '2rem',
    textDecoration: 'none',
    color: 'white',
  }
}));

const initState = {
  mainMenuAnchorEl: null,
  userMenuAnchorEl: null
}

//A dummy header should be used to pad the layout beneath the header.
export default ({dummy}) => {
  const classes = useStyles();

  const { data } = useQuery(tags.readMe)

  const [state, setState] = useState(initState)

  function closeMainMenu() {
    setState(initState)
  }
  function closeUserMenu() {
    setState(initState)
  }
  function openMainMenu(e) {
    setState({
      mainMenuAnchorEl: e.currentTarget,
      userMenuAnchorEl: null
    })
  }
  function openUserMenu(e) {
    setState({
      mainMenuAnchorEl: null,
      userMenuAnchorEl: e.currentTarget
    })
  }

  const style = {
    position: dummy ? "relative" : "fixed",
    top: '0',
    left: '0',
    right: '0',
    zIndex: '100'
  }
 
  return (
    <div id={dummy ? null : "header"} style={style}>
      <AppBar style={{position: 'relative'}}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={null} color="inherit" aria-label="menu" onClick={openMainMenu}>
            <MenuIcon />
          </IconButton>
          <MainMenu
            anchorEl={state.mainMenuAnchorEl} 
            open={Boolean(state.mainMenuAnchorEl)} 
            handleClose={closeMainMenu} 
            keepMounted
            me={data?.me}
          />
          <Link to="/" className={classes.title}>
            Feel with me
          </Link>
          {data?.me ? <MessagesButton className={classes.menuButton}/> : null}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={openUserMenu}>
            {data?.me ? <Avatar className={classes.menuButton} src={data?.me.imageUrl}/> : <AccountCircleIcon className={classes.menuButton}/>}
          </IconButton>
          <UserMenu 
            anchorEl={state.userMenuAnchorEl} 
            open={Boolean(state.userMenuAnchorEl)} 
            handleClose={closeUserMenu}
            keepMounted
            me={data?.me}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}