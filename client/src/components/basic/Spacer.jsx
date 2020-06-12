import React from 'react'
import { Box } from '@material-ui/core'

export default function Spacer({percent, horizontal}) {
  let baseHeight = 5;
  let baseWidth = 3; 

  if (percent) {
    baseHeight *= percent / 100
  }

  const height = baseHeight.toString() + "rem"

  return (
    <Box height={height}/>
  )
}