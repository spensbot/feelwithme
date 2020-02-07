import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
//Material UI
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
//Custom
import Config from '../config'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(220, 45, 105)',
        alignItems: 'center',
        minHeight: '100vh'
    },
    title: {
        fontSize: '5em',
        fontFamily: 'Dancing Script',
        fontWeight: 'lighter',
        margin: 0
    },
    info: {
        fontSize: '1em',
        margin: theme.spacing()
    },
    fab: {
        backgroundColor: "rgba(0,0,0,0)", 
        border: "1px solid rgba(0,0,0,.3)"
    },
    accountCircle: {
        marginRight: ".3em"
    }
}))

//--------------------     REACT COMPONENT     --------------------

function Login({mainUser}){

    const classes = useStyles();

    if (mainUser.user) {
        return <Redirect to={'/users/' + mainUser.user._id} />
    }

    return (
        <div className={classes.root}>
            <Box flex="2 1 auto"/>
            <h1 className={classes.title}>feel with me</h1>
            <img src={Config.homeRoute + "/images/logo512nbg.png"} alt="Feel With Me Logo Icon" width="250em"/>
            { mainUser.isFetching ? 
                <CircularProgress /> :
                <Button href={Config.serverRoutes.authUrlSpotify}>login with spotify to get started</Button>
            }
            <Box flex="3 1 auto"/>
        </div>
    );
}

//------------------     REACT-REDUX CONTAINER     -------------------

const mapStateToProps = state => {
    return {
        mainUser: state.mainUser
    }
}

export default connect(
    mapStateToProps
)(Login)