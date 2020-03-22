import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Box, Typography } from '@material-ui/core'
import config from '../../config'
import SiteContainer from './SiteContainer'

export default () => {
  return (
    <SiteContainer >
    <Box display='flex' flexDirection="column" justifyContent='center' alignItems='center' height="100vh">
      <Box flex="1" />
      <Box display='flex' justifyContent='center' alignItems='center' >
        
        <Typography element="h3" variant="h4">
          Computers At Work
        </Typography>
        <Box width='2rem' />
        <CircularProgress />
        
      </Box>
        
        <Box width="100%" mt="1rem" display="flex" justifyContent="center">
          <Box maxWidth="30rem">
            <img
              src={config.homeRoute + "/images/Computers At Work.png"}
              alt="Computers At Work"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      <Box flex="2" />
    </Box>
    </SiteContainer>
  )
}
