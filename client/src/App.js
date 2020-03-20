import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import themes from './themes'
import LoginGate from './components/LoginGate'

function App() {
  return (
    <ThemeProvider theme={themes.dark}>
      <CssBaseline />
      <LoginGate />
    </ThemeProvider>
  );
}

export default App;
