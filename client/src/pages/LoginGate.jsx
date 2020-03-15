import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Switch, Route } from 'react-router-dom'

import Error from './Error'
import Login from './Login'
import Messages from './Messages'
import About from './About'
import User from './User'

const GET_ME = gql`
  {
    me {
      spotifyId
      spotifyProfileUrl

      id
      displayName
      isInitialized
      bio
      imageUrl
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_ME)
  if (loading) return <Login isLoading/>
  if (error) {
    console.log(error)

    return <Error error={error}/>
  }

  const me = data.me

  if (!me) {
    return (
      <Login me={me} />
    )
  }

  return (
    <Switch>
      <Route path="/users/:id">
        <User me={me}/>
      </Route>
      <Route path="/about">
        <About me={me}/>
      </Route>
      <Route path="/messages">
        <Messages me={me}/>
      </Route>
      <Route path="/">
        <Login me={me} />
      </Route>
    </Switch>
  )
}