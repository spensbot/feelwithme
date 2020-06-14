import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag' 
import {setAlert} from '../../localCache'

const CREATE_MESSAGE = gql`
mutation CreateMessage($to: ID! $content: String!){
  createMessage(to: $to content: $content){
    id
    to
    from
    sent
    content
    viewed
  }
}`

const READ_SCOPED_MESSAGES = gql`
query scopedMessages($id: ID!){
  scopedMessages(id: $id){
    id
    from
    to
    content
    sent
    viewed
  }
}`

export default function MessageInput() {

  const {id} = useParams()

  const [message, setMessage] = useState("")

  const client = useApolloClient()

  const onCompleted = data => {
    setAlert(client, 'success', 'Message Sent', 2000)
    setMessage("")
  }
  const onError = error => {
    setAlert(client, 'error', 'Message Not Sent. Please try again.')
  }
  const update = (cache, {data : { createMessage } }) => {
    const { scopedMessages } = cache.readQuery({ query: READ_SCOPED_MESSAGES, variables: {id: id} })
    console.log(createMessage)
    const updatedScopedMessages = scopedMessages.concat([createMessage])
    console.log(updatedScopedMessages)
    cache.writeQuery({
      query: READ_SCOPED_MESSAGES,
      variables: {id: id},
      data: { scopedMessages: updatedScopedMessages }
    })
  }

  const [sendMessage] = useMutation(CREATE_MESSAGE, {onCompleted: onCompleted, onError: onError, update: update})
  
  function onChange(e) {
    setMessage(e.target.value)
  }

  function submit(e) {
    sendMessage({ variables: { to: id , content: message } })
  }

  const sendButton = message ?
    <Button variant="contained" onClick={submit}> send </Button>
    : null

  return (
    <Box marginTop="1em" position="relative">
      <TextField
        label="New Message"
        fullWidth={true}
        onChange={onChange}
        multiline
        rows="4"
        value={message}
        variant="outlined"
      />
      <Box position="absolute" right="1rem" bottom="1rem">
        {sendButton}
      </Box>
      
    </Box>
  )
}