import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Box } from '@material-ui/core'

export default () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress />
      <h1>Loading</h1>
    </Box>
  )
}
