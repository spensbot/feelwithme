import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 200,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    width: '90%',
    maxWidth: '35rem',
    padding: '4%',
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
  },
}))

export default function ShareDialog({children}) {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.dialog}>
        {children}
      </Paper>
    </div>
  )
}
