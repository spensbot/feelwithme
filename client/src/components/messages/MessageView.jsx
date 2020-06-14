import React, {useState} from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import MessageHeader from './MessageHeader'
import Box from '@material-ui/core/Box'
import { useQuery } from '@apollo/react-hooks'
import { useParams, Redirect } from 'react-router-dom'
import gql from 'graphql-tag' 
import config from '../../config'
import LoadingComponent from '../basic/LoadingComponent'
import ErrorComponent from '../basic/ErrorComponent'

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
      <LoadingComponent />
    )
  }
  if(error){
    return (
      <ErrorComponent />
    )
  }

  if(!data.user){
    return <Redirect to={config.routes.messages}></Redirect>
  }

  return (
    <Box height="100%" flexGrow="2" display="flex" flexDirection="column">
      {header ? <MessageHeader /> : null}
      <Box height="1rem" flex="1 1 30rem" display="flex" flexDirection="column" mx="1rem" mb="1rem">
        <MessageList />
        <MessageInput />
      </Box>
    </Box>
  )
}