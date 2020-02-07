import React from 'react'
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
import { connect } from 'react-redux'
import { setMainMenu, setUserMenu } from '../../redux/actions'
import Avatar from '@material-ui/core/Avatar'
import MainMenu from './MainMenu'
import UserMenu from './UserMenu'

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

function Header({mainMenuAnchorEl, userMenuAnchorEl, user, setMainMenu, setUserMenu}) {
  const classes = useStyles();

  function closeMainMenu() {
    setMainMenu(null)
  }
  function closeUserMenu() {
    setUserMenu(null)
  }
  function openMainMenu(e) {
    setMainMenu(e.currentTarget)
  }
  function openUserMenu(e) {
    setUserMenu(e.currentTarget)
  }

 
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={openMainMenu}>
            <MenuIcon />
          </IconButton>
          <MainMenu anchorEl={mainMenuAnchorEl} handleClose={closeMainMenu} />
          <Typography variant="h6" className={classes.title}>
            Feel with me
          </Typography>
          <IconButton component={Link} to={Config.routes.messages} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Badge badgeContent={4} color="primary">
                <ChatIcon />
            </Badge>
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={openUserMenu}>
            {user ? <Avatar src={user.imageUrl}/> : <AccountCircleIcon />}
          </IconButton>
          <UserMenu anchorEl={userMenuAnchorEl} handleClose={closeUserMenu} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    mainMenuAnchorEl: state.header.mainMenuAnchorEl,
    userMenuAnchorEl: state.header.userMenuAnchorEl,
    user: state.mainUser.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMainMenu: anchorEl => dispatch(setMainMenu(anchorEl)),
    setUserMenu: anchorEl => dispatch(setUserMenu(anchorEl))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
