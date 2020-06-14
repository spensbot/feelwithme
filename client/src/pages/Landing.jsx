import React from 'react'
//Material UI
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
//Custom
import Config from '../config'
import About from './About'
import LearnMoreButton from '../components/Landing/LearnMoreButton'

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
  loadingSection: {
    '& p': {
      margin: '0 1rem'
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fffa',
    fontSize: '1.2rem'
  }
}))

//--------------------     REACT COMPONENT     --------------------

export default function Landing({isLoading}){

  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <Box flex="2 1 auto"/>
        <h1 className={classes.title}>feel with me</h1>
        <img src={Config.homeRoute + "/images/logo512nbg.png"} alt="Feel With Me Logo Icon" width="250em"/>
        { isLoading
          ? 
          <div className={classes.loadingSection}>
            <CircularProgress style={{width: '2rem', height: '2rem'}} />
            <p>Loading Your Info</p>
          </div>
          :
          <Button className={classes.button} href={Config.serverRoutes.authUrlSpotify}>login with spotify to get started</Button>
        }
        <Box flex="3 1 auto"/>

        <LearnMoreButton />

      </div>
      <About dontUseHeader/>
    </>
  );

}