import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
//Material UI
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
//Custom
import themes from './themes'
import { getMainUser, getMatches, wsConnect } from './redux/actions'
import { requestStates } from './redux/reducers'
import UserGate from './components/UserGate'
import About from './components/About'
import Login from './components/Login'
import Messages from './components/Messages'
import ErrorDialog from './components/sub1/ErrorDialog'
import MobileDetector from './components/sub1/MobileDetector'

//--------------------     REACT COMPONENT     --------------------

function App({ mainUser, matches, darkTheme, getMainUser, getMatches, wsConnect }) {

  //Get user if necessary
  if (mainUser.requestState === requestStates.NOT_MADE) {
    getMainUser()
  }

  //Get matches once the user is logged in
  if (mainUser.user && matches.requestState === requestStates.NOT_MADE) {
    getMatches()
  }

  //Connect to socket-io once the user is logged in
  if (mainUser.user) {
    wsConnect()
  }

  return (
    <ThemeProvider theme={darkTheme ? themes.dark : themes.light}>
      <CssBaseline />
      <ErrorDialog />
      <MobileDetector />
      <Switch>
        <Route path="/users/:id">
          <UserGate />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </ThemeProvider>
  )
}

//------------------     REACT-REDUX CONTAINER     -------------------

const mapStateToProps = state => {
  return {
    mainUser: state.mainUser,
    matches: state.matches,
    darkTheme: state.darkTheme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMainUser: () => dispatch(getMainUser()),
    getMatches: () => dispatch(getMatches()),
    wsConnect: () => dispatch(wsConnect())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)




