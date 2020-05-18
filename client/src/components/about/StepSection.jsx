import React from 'react'
import { makeStyles, Typography, Box } from '@material-ui/core'
import Divider from '../basic/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 -1rem'
  },
  alternate: {
    //backgroundColor: '#00000007',
    //flexDirection: 'row-reverse'
  },
  sub: {
    flexGrow: '1',
    flexShrink: '0',
    flexBasis: '40%',
    margin: '1rem 1rem',
    minWidth: '16rem'
  },
}))

export default function StepSection({num, title, description, imageSrc, imageAlt, imageSub}) {

  const classes = useStyles();
  let rootClass = classes.root;

  //Check for odd step number
  if (num % 2 == 1) {
    rootClass += " " + classes.alternate;
  }

  return (
    <>
    <Box display="flex" alignItems="center">
      <Typography element="h2" variant="h3">Step {num.toString()}</Typography>
      <Box flexGrow="1"><Divider marginX="1rem"/></Box>
      
    </Box>
    <div className={rootClass}>
      <div className={classes.sub}>
        <Typography element="h3" variant="h4">{title}</Typography>
        <Typography element="p">{description}</Typography>
      </div>
      <div className={classes.sub}>
        <img width="100%" height="100%" src={imageSrc} alt={imageAlt} />
        <p>{imageSub}</p>
      </div>
    </div>
    </>
  )
}
