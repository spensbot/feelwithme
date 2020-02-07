import React from 'react'
import {connect} from 'react-redux'
//Material UI
//Custom
import User from './User'
import { getOtherUser } from '../redux/actions'


//--------------------     REACT COMPONENT     --------------------

function UserOther({id, otherUsers, getOtherUser}) {

    if (!otherUsers[id]){
        getOtherUser(id)
        return (
            <h1>Fetching User Data</h1>
        )
    } else {
        return (
            <User isMainUser={false} otherUser={otherUsers[id]} />
        )
    }
}

//------------------     REACT-REDUX CONTAINER     -------------------

const mapStateToProps = state => {
    return {
        otherUsers: state.otherUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOtherUser: userId => dispatch(getOtherUser(userId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserOther)