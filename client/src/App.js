import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import themes from './themes'
import UserGate from './pages/LoginGate'

function App() {
  return (
    <ThemeProvider theme={themes.dark}>
      <CssBaseline />
      <UserGate />
    </ThemeProvider>
  );
}

export default App;
