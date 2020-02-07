import React from 'react'
import { connect } from 'react-redux'
//Material UI
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
//Custom
import MatchList from './sub1/MatchList'
import UserInfo from './sub1/UserInfo'
import BasicList from './sub1/BasicList'
import MatchDescription from './sub1/MatchDescription'
import { requestStates } from '../redux/reducers'
import LoadingPage from './LoadingPage'

const useStyles = makeStyles(theme => ({
  list: {
    flex: '1 1 auto'
  }
}))

//--------------------     REACT COMPONENT     --------------------

function User({ isMainUser, otherUser, mainUser }) {
  const classes = useStyles()

  const viewedUser = isMainUser ? mainUser : otherUser

  if (viewedUser.requestState === requestStates.FETCHING) {
    return (
      <LoadingPage />
    )
  }

  return (
    <div>
      <UserInfo isMainUser={isMainUser} viewedUser={viewedUser} />
      {isMainUser ? <MatchList /> : <MatchDescription />}
      <Box display="flex" flexWrap="wrap">
        <div className={classes.list}>
          <BasicList isMainUser={isMainUser} isSongs={false} items={viewedUser.user.topArtists} />
        </div>
        <div className={classes.list}>
          <BasicList isMainUser={isMainUser} isSongs={true} items={viewedUser.user.topSongs} />
        </div>
      </Box>
    </div>
  )
}


//------------------     REACT-REDUX CONTAINER     -------------------

const mapStateToProps = state => {
  return {
    mainUser: state.mainUser
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)