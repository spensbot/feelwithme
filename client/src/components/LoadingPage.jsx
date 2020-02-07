import React from 'react'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function LoadingPage() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <h1>Loading User Data</h1>
      <CircularProgress />
    </Box>
  )
}