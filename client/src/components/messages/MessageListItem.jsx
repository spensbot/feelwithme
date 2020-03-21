import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import { makeStyles, rgbToHex } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  outgoing: {
    marginRight: 'auto',
    width: '70%',
  },
  outgoingCard: {
    backgroundColor: 'rgba(100,100,100,.8)',
    borderRadius: '1rem',
    color: 'white',
    padding: '1rem'
  },
  incoming: {
    width: '70%',
    marginLeft: 'auto'
  },
  incomingCard: {
    backgroundColor: 'rgba(70,70,200,.8)',
    borderRadius: '.7rem',
    color: 'white',
    padding: '1rem'
  },
  infoText: {
    textAlign: 'right',
    marginTop: '.3rem',
    marginBottom: '.8rem',
    fontSize: '.8rem',
    opacity: .5
  }
}))

export default ({ isOutgoing, content, timeStamp }) => {

  const classes = useStyles()

  let root = isOutgoing ? classes.outgoing : classes.incoming
  let card = isOutgoing ? classes.outgoingCard : classes.incomingCard

  return (
    <div className={root}>
      <Card className={card} elevation="0">
        <Typography>
          {content}
        </Typography>
      </Card>
      <Typography className={classes.infoText}>
        {timeStamp}
      </Typography>
    </div>
  )
}