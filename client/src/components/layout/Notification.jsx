import React from 'react'
import { makeStyles, Typography, Button, Box, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag' 

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '0 0 0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: '0',
    left: '0',
    right: '0'
  }
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const READ_NOTIFICATION = gql`{
  notification @client{
    type
    message
  }
}`

export default ({fixed}) => {
  const classes = useStyles()
  const {data} = useQuery(READ_NOTIFICATION)

  console.log("Notification Data: " + data)

  const stuff = "Hello World"

  if (!stuff) return null

  const open = true

  const handleClose = () => {
    
  }

  return (
    // <Box className={classes.root} position={fixed ? "fixed" : "relative"}>
    //   <Typography>{stuff}</Typography> 
    //   <Button>X</Button>
    // </Box>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        This is a success message!
      </Alert>
    </Snackbar>
  )
}
