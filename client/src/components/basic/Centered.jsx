import React from 'react'
import { Box } from '@material-ui/core'

export default ({children}) => {
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100vh'>
      <Box flexGrow='1'/>
      {children}
      <Box flexGrow='2'/>
    </Box>
  )
}
