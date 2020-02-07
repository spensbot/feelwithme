import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'

const size="2rem"

const useStyles = makeStyles(theme => ({
  root: {
    color: 'rgb(10,200,10)',
    fontSize: size,
  },
  icon: {
    width: size,
    height: size,
    marginLeft: theme.spacing()
  }
}))

export default function CommonIndicator(){
  const classes = useStyles()

  return (
    <Box className={classes.root} display="flex" alignItems="center" flexWrap="noWrap">
      <Typography></Typography>
      <CheckCircleIcon className={classes.icon} />
      {/* <CheckIcon className={classes.icon} /> */}
    </Box>
  )
}


