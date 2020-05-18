import React from 'react'
import { Box } from '@material-ui/core'

export default function Spacer({percent, horizontal}) {
  baseHeight = 5;
  baseWidth = 3; 

  if (percent) {
    baseHeight *= percent / 100
  }

  height = baseHeight.toString() + "rem"

  return (
    <Box height={height}/>
  )
}