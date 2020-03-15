import React from 'react'
import { Box } from '@material-ui/core'

export default function Spacer({vertical}) {
  return (
    vertical ? <Box width="5rem"/> : <Box height="5rem"/>
  )
}