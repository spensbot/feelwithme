import React from 'react'
//Material UI
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { makeStyles, Typography } from '@material-ui/core'
//Custom
import Config from '../config'
import { Redirect } from 'react-router-dom'

import { useQuery } from '@apollo/react-hooks'
import tags from '../gqlTags'
import About from './About'
import ErrorPage from '../components/basic/ErrorPage'

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
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
    color: '#111111',
    margin: 0
  },
  info: {
    fontSize: '1em',
    margin: theme.spacing()
  },
  button: {
    color: 'black'
  },
  accountCircle: {
    marginRight: ".3em"
  },
  scrollButton: {
    display: 'flex',
    position: 'absolute',
    bottom: '1rem'
  }
}))

//--------------------     REACT COMPONENT     --------------------

export default function Landing(){

  const classes = useStyles()

  const { loading, error, data } = useQuery(tags.readMe)

  if (error) return <ErrorPage />

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
          <Button className={classes.button} href={Config.serverRoutes.authUrlSpotify}>login with spotify to get started</Button>
        }
        <Box flex="3 1 auto"/>
        
        <div className={classes.scrollButton}>
          <ArrowDownwardIcon />
          <Typography>Scroll To Learn More</Typography>
          <ArrowDownwardIcon />
        </div>
      </div>
      <About dontUseHeader/>
    </>
  );

}