import React from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import MessageHeader from './MessageHeader'
import Box from '@material-ui/core/Box'
import { useQuery } from '@apollo/react-hooks'
import { useParams, Redirect } from 'react-router-dom'
import gql from 'graphql-tag' 
import config from '../../config'


export const READ_USER_DATA = gql`
query UserData($id: ID!){
  user(id: $id){
    id
    spotifyId
    spotifyProfileUrl
    isInitialized
    displayName
    bio
    imageUrl
  }
}`

export default ({header}) => {

  const {id} = useParams()
  const {loading, error, data} = useQuery(READ_USER_DATA, {variables: {id}})

  if(loading){
    return (
      <h1>Loading</h1>
    )
  }
  if(error){
    return (
      <h1>Error</h1>
    )
  }

  if(!data.user){
    return <Redirect to={config.routes.messages}></Redirect>
  }

  return (
    <Box width="100%" flex='2'>
      {header ? <MessageHeader /> : null}
      <Box display="flex" flex="3 1 auto" flexDirection="column" mx="1rem" mb="1rem">
        <MessageList />
        <MessageInput />
      </Box>
    </Box>

  )
}