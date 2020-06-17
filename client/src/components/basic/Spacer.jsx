import React from 'react'
import { Box } from '@material-ui/core'

export default function Spacer({percent}) {
  let height = 3;
  let width = 1; 

  if (percent) {
    height *= percent / 100 
    width *= percent / 100
  }

  const heightString = height.toString() + "rem"
  const widthString = width.toString() + "rem"

  return (
    <Box height={heightString} width={widthString}/>
  )
}