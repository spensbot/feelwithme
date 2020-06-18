import React, { useState } from 'react'
import { Button, Typography, Paper, makeStyles } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'
import ShareDialog from './ShareDialog'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1.5rem',
  },
  sub: {
    display:"flex",
    flexDirection:"row" ,
    justifyContent:"flex-start" ,
    alignItems:"center" ,
    flexWrap:"wrap",
    margin: '-0.5rem',
    '& > *': {
      margin: '0.5rem'
    }
  }
}))

export default function ShareSection() {

  const classes = useStyles()

  const [isDialog, setIsDialog] = useState(false)

  function shareProfile(event) {
    if (navigator.share) {
      navigator.share({
        title: 'Share your Feel With Me profile!',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!')
      })
      .catch(console.error)
    }
    else {
      setIsDialog(true)
    }
  }

  return (
    <div>
      <Paper elevation={5} className={classes.root}>
          <div className={classes.sub}>
          <Typography variant="h5" style={{flexGrow: 1}}>See how you match with friends</Typography>
          <Button variant="contained" onClick={shareProfile}><ShareIcon style={{marginRight: '0.5rem'}}/>Share Profile</Button>
          </div>
      </Paper>
        
      {isDialog ? <ShareDialog onClose={() => setIsDialog(false)}/> : null}
    </div>

  )
}
