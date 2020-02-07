import React from 'react'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

export default function MessageInput({}) {
  
  function onChange(e) {
    
  }

  return (
    <Box marginTop="1em">
      <TextField
        label="New Message"
        fullWidth={true} value={"Test Value"}
        onChange={onChange}
        multiline
        rows="4"
        variant="outlined"
      />
    </Box>
  )
}