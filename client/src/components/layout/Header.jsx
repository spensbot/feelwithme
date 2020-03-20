import React, { useState }  from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom'
import Config from '../../config'
import Avatar from '@material-ui/core/Avatar'
import MainMenu from './MainMenu'
import UserMenu from './UserMenu'
import tags from '../gqlTags'
import {useQuery} from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: 'rgb(205, 40, 95)'
    //backgroundColor: 'rgb(220, 45, 105)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontFamily: 'Dancing Script, Cursive',
    fontSize: '2.5em'
  }
}));

const initState = {
  mainMenuAnchorEl: null,
  userMenuAnchorEl: null
}

export default ({fixed}) => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(tags.readMe)

  const [state, setState] = useState(initState);

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
 
  return (
    <div className={classes.root}>
      <AppBar position={fixed ? "fixed" : "relative"}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openMainMenu}>
            <MenuIcon />
          </IconButton>
          <MainMenu
            anchorEl={state.mainMenuAnchorEl} 
            open={Boolean(state.mainMenuAnchorEl)} 
            handleClose={closeMainMenu} 
            keepMounted
            me={data.me}
          />
          <Typography variant="h6" className={classes.title}>
            Feel with me
          </Typography>
          <IconButton component={Link} to={Config.routes.messages} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Badge badgeContent={4} color="primary">
                <ChatIcon />
            </Badge>
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={openUserMenu}>
            {data.me ? <Avatar src={data.me.imageUrl}/> : <AccountCircleIcon />}
          </IconButton>
          <UserMenu 
            anchorEl={state.userMenuAnchorEl} 
            open={Boolean(state.userMenuAnchorEl)} 
            handleClose={closeUserMenu}
            keepMounted
            me={data.me}
          />
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
    </div>
  );
}