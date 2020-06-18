import React, { useState } from 'react'
import { Checkbox, Box, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import config from '../../config'
import { Link } from 'react-router-dom'

export default function LoginForm() {
  const [state, setState] = useState({
    checked: false,
    error: null
  })

  function login() {
    if (state.checked) {
      window.location.href = config.serverRoutes.authUrlSpotify
    } else {
      setState({
        ...state,
        error: "*You must agree to use this app"
      })
    }
  }

  function handleChange() {
    setState({
      checked: !state.checked,
      error: null
    })
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" maxWidth="30rem">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Checkbox style={{color: 'whitesmoke'}} checked={state.checked} onChange={handleChange} />
        <Typography style={{fontSize: "0.9rem"}}>I have read and accept the <Link to="/terms">Terms & Conditions</Link></Typography>
      </Box>
      <Typography style={{color: "#fffa", fontSize: "0.8rem"}}>{state.error}</Typography>
      <Button style={{color: "black"}} onClick={login}>login with spotify to get started</Button>
    </Box>
  )
}
