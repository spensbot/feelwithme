import React from 'react'
//Material UI
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { makeStyles, Typography } from '@material-ui/core'
//Custom
import Config from '../config'
import About from './About'
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
    '& > *': {
      color: '#fffa',
      margin: '0 0.3rem'
    },
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '1rem',
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

  console.log("About to render")

  function scrollToAbout(event) {
    const pageHeight = window.innerHeight
    window.scrollTo({
      top: pageHeight,
      behavior: 'smooth'     
    })
  }
 
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
        
        <div className={classes.scrollButton}>
          <ArrowDownwardIcon />
          <Button onClick={scrollToAbout}>Scroll To Learn More</Button>
          {/* <p><a onClick>Scroll To Learn More</a></p> */}
          <ArrowDownwardIcon />
        </div>
      </div>
      <About dontUseHeader/>
    </>
  );

}