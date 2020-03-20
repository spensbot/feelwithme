import React from 'react'
//Material UI
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
//Custom
import Config from '../config'
import { Redirect } from 'react-router-dom'

import { useQuery } from '@apollo/react-hooks'
import tags from '../components/gqlTags'
import About from './About'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(220, 45, 105)',
    alignItems: 'center',
    minHeight: '100vh',
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

export default function Login({isLoading, me}){

  const classes = useStyles()

  const { loading, error, data } = useQuery(tags.readMe)

  if (data && data.me) {
    return <Redirect to={'/users/' + data.me.id} />
  }
 
  return (
    <>
      <div className={classes.root}>
        <Box flex="2 1 auto"/>
        <h1 className={classes.title}>feel with me</h1>
        <img src={Config.homeRoute + "/images/logo512nbg.png"} alt="Feel With Me Logo Icon" width="250em"/>
        { loading ? 
          <div><CircularProgress /><p>Loading Your Info</p></div> :
          <Button href={Config.serverRoutes.authUrlSpotify}>login with spotify to get started</Button>
        }
        <Box flex="3 1 auto"/>
      </div>
      <About dontUseHeader/>
    </>
  );

}