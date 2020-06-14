import React, { useEffect, useState, useRef } from 'react'
//Material UI
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
//Custom
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

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

  const requestRef = useRef();

  function scrollToAbout(event) {
    const pageHeight = window.innerHeight
    window.scrollTo({
      top: pageHeight,
      behavior: 'smooth'     
    })
  }

  function tryToAnimate() {
    if (!animating) {
      requestRef.current = requestAnimationFrame(updateOpacity)
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
    window.addEventListener('scroll', tryToAnimate)

    //Return a cleanup function to remove the listener after the component unmounts
    //The empty array argument to useEffect specifys that cleanup should only occur after unmounting, not between renders
    return () => {
      window.removeEventListener('scroll', tryToAnimate)
      cancelAnimationFrame(requestRef.current)
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
