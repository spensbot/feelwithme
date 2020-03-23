import React from 'react'
import { Link } from 'react-router-dom'
import Centered from '../basic/Centered'
import config from '../../config'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ErrorPage from '../basic/ErrorPage'
import LoadingPage from '../basic/LoadingPage'

const GET_ME = gql`{
  me {
    id
  }
}`

export default () => {

  const {data, loading, error} = useQuery(GET_ME)

  if (error) return <ErrorPage />
  if (loading) return <LoadingPage />

  return (
    <Centered>
      <p>You haven't sent or received any messages yet.</p>
      <Link to={config.routes.users + "/" + data.me.id}>Try messaging one of your matches</Link>
    </Centered>
  )
}
