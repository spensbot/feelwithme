import React, { useState } from 'react'
import { Button, Typography, Paper, Box } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'
import Spacer from '../basic/Spacer'
import ShareDialog from './ShareDialog'

export default function ShareSection() {

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
      <Paper style={{padding: '3%', textAlign: 'center'}} elevation={5}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography>Find out how you match with friends!</Typography>
        <Spacer percent={50}/>
        <Button variant="contained" onClick={shareProfile}><ShareIcon style={{marginRight: '0.5rem'}}/>Share Profile</Button>
        </Box>
      </Paper>
      {isDialog ? <ShareDialog onClose={() => setIsDialog(false)}/> : null}
    </div>

  )
}
