import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  heading: {
    marginBottom: theme.spacing(5)
  }
}))

export default function MatchDescription(match){
  const classes = useStyles()

  return (
    <Card>
      <CardContent>
        <Typography className={classes.heading} element="h2" variant='h6'>
          Wow, you two have a lot in common! (musically at least)
        </Typography>
        <Typography element="h4">
          Check-marks indicate an interest you share
        </Typography>
      </CardContent>
    </Card>
  )
}