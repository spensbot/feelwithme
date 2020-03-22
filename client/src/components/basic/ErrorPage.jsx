import React from 'react'
import { Box, Typography } from '@material-ui/core'
import config from '../../config'
import SiteContainer from './SiteContainer'

export default () => {
  return (
    <SiteContainer >
    <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center' height="100vh">
      <Box flexGrow="1" />
      <Typography element="h3" variant="h4">
        Something Went Wrong.
      </Typography>
        
      <Box width="100%" mt="1rem" display="flex" justifyContent="center">
        <Box maxWidth="30rem">
          <img
            src={config.homeRoute + "/images/Computers In Error.png"}
            alt="Computers At Work"
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
      <Typography element="h3" variant="h4">
        Try Refreshing
      </Typography>
      <Box flexGrow="2" />
    </Box>
    </SiteContainer>
  )
}