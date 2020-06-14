import React from 'react'
import Layout from '../components/Layout'
import { Typography } from '@material-ui/core'
import Spacer from '../components/basic/Spacer'

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Spacer percent={50}/>
      <Typography component="h1" variant="h3">Privacy Policy</Typography>
      <Spacer percent={50}/>
      <Typography>Blah, blah, blah.</Typography>
    </Layout>
  )
}
