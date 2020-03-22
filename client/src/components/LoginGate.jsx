import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Switch, Route } from 'react-router-dom'
import ErrorPage from './basic/ErrorPage'
import Login from '../pages/Login'
import Messages from '../pages/Messages'
import About from '../pages/About'
import User from '../pages/User'
import tags from '../gqlTags'

export default () => {
  const { loading, error, data } = useQuery(tags.readMe)
  if (loading) return <Login isLoading/>
  if (error) {
    console.log(error)
    return <ErrorPage />
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
        <User />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/messages/:id">
        <Messages />
      </Route>
      <Route path="/messages">
        <Messages />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  )
}