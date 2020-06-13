import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag' 
import {removeAlert} from '../../localCache'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const READ_ALERT = gql`{
  alertType @client
  alert @client
}`

export default () => {
  const {data} = useQuery(READ_ALERT)

  const client = useApolloClient()

  const handleClose = () => {
    removeAlert(client)
  }

  const open = !!data.alert

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={data.alertType}>
        {data.alert}
      </Alert>
    </Snackbar>
  )
}
