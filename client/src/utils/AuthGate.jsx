import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

function AuthGate({user}) {
  if(!user){
    return (<Redirect to="/login"/>)
  } else {
    return (null)
  }
}

const mapStateToProps = state => ({
  user: state.mainUser.user
})

export default connect(
  mapStateToProps
)(AuthGate)