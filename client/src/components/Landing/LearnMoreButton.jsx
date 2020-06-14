import React from 'react'
//Material UI
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
//Custom
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { useEffect } from 'react'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
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
}))

const initOpacity = 1.0

export default function LearnMoreButton() {

  const [opacity, setOpacity] = useState(initOpacity)

  const classes = useStyles()

  let animating = false

  function scrollToAbout(event) {
    const pageHeight = window.innerHeight
    window.scrollTo({
      top: pageHeight,
      behavior: 'smooth'     
    })
  }

  function tryToAnimate() {
    if (!animating) {
      requestAnimationFrame(updateOpacity)
      animating = true
    }
  }

  function updateOpacity() {
    const scroll = window.scrollY
    const height = window.innerHeight
    const start = 0.0
    let ratio = 1.0
    if (scroll > start) {
      ratio = (scroll - start) / (height - start)
      ratio = 1.0 - ratio
      if (ratio < 0.0) ratio = 0.0
    }
    animating = false
    setOpacity(ratio * initOpacity)
  }

  useEffect( () => {
    console.log("effect used")
    window.addEventListener('scroll', tryToAnimate)

    //Return a cleanup function to remove the listener after the component unmounts
    //The empty array argument to useEffect specifys that cleanup should only occur after unmounting, not between renders
    return () => {
      console.log("cleanup")
      window.removeEventListener('scroll', tryToAnimate)
    } 
  }, [])
 
  tryToAnimate()

  return (
    <div className={classes.root} style={{opacity: opacity}}>
      <ArrowDownwardIcon />
      <Button onClick={scrollToAbout}>Scroll To Learn More</Button>
      {/* <p><a onClick>Scroll To Learn More</a></p> */}
      <ArrowDownwardIcon />
    </div>
  )
}
