import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import themes from './themes'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag' 
import GateKeeper from './GateKeeper'

const READ_THEME = gql`{
  theme @client
}`

function App() {
  const {data} = useQuery(READ_THEME)

  let theme = themes.dark

  if (data.theme === 'LIGHT')
    theme = themes.light
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GateKeeper />
    </ThemeProvider>
  )
}

export default App;
