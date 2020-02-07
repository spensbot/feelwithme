import React from 'react'
import {connect} from 'react-redux'
import { useParams, Redirect } from 'react-router'
//Material UI
import Container from '@material-ui/core/Container'
//Custom
import Header from './sub1/Header'
import Footer from './sub1/Footer'
import UserOther from './UserOther'
import User from './User'

//--------------------     REACT COMPONENT     --------------------

function UserGate({user}) {

    const viewedUserId = useParams().id

    //Return to login if neccessary
    if (!user) {
        return (<Redirect to="/login"/>)
    }

    return (
        <Container maxWidth="md">
            <Header />
            { viewedUserId === user._id ? 
                <User isMainUser={true} /> :
                <UserOther id={viewedUserId} />
            }
            <Footer />
        </Container>
    )
}

//------------------     REACT-REDUX CONTAINER     -------------------

const mapStateToProps = state => {
    return {
        user: state.mainUser.user
    }
}

export default connect(
    mapStateToProps
)(UserGate)