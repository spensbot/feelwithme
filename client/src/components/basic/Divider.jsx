import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.text.primary
  }
}))

export default ({vertical, color, thickness, marginX, marginY}) => {
  const classes = useStyles();

  const Thickness = thickness || '1px'
  const MarginX = marginX || '0'
  const MarginY = marginY || '0'

  const style = {
    width: vertical ? Thickness : 'auto',
    height: vertical ? 'auto' : Thickness,
    margin: `${MarginY} ${MarginX}`
  };

  return (
    <div className={classes.root} style={style}></div>
  )
}
