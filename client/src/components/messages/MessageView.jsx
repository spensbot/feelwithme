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
  const [dummy, setstate] = useState(null)

  const rerender = () => {
    console.log("WHEL please rerender")
    setstate(1)
  }

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
    <Box width="100%" flex='2'>
      {header ? <MessageHeader /> : null}
      <Box display="flex" flex="3 1 auto" flexDirection="column" mx="1rem" mb="1rem">
        <MessageList />
        <MessageInput rerender={rerender}/>
      </Box>
    </Box>
  )
}