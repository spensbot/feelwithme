import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Switch } from 'react-router-dom'
import ErrorPage from './components/basic/ErrorPage'
import Landing from './pages/Landing'
import Messages from './pages/Messages'
import About from './pages/About'
import User from './pages/User'
import Terms from './pages/Terms'
import PrivacyPolicy from './pages/PrivacyPolicy'
import gql from 'graphql-tag'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import {migrateImage} from './utils/imageProcessing'

const QUERY = gql`{
  me {
    id
    imageUrl
  }
}`

export default function GateKeeper() {

  const { loading, error, data } = useQuery(QUERY)

  if (loading) return <Landing isLoading/>
  if (error) {
    console.log(error)
    return <ErrorPage />
  }

  if (data.me && data.me.imageUrl) {
    const imageUrl = new URL(data.me.imageUrl)
    if (imageUrl.host !== 'feelwithme-profile-pics.s3-us-west-2.amazonaws.com') {
      console.log("Moving Profile Picture To S3")
      migrateImage(imageUrl, data.me.id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <Switch>
      <PublicRoute path="/about" component={About} />
      <PublicRoute path="/terms" component={Terms} />
      <PublicRoute path="/privacy-policy" component={PrivacyPolicy} />
      <PrivateRoute path="/user/:id" component={User} />
      <PrivateRoute path="/messages/:id" component={Messages} />
      <PrivateRoute path="/messages" component={Messages} />
      <PublicRoute path="/" component={Landing} restricted/>
    </Switch>
  )
}