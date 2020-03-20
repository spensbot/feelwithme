import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag' 

const CREATE_MESSAGE = gql`
mutation CreateMessage($to: ID! $content: String!){
  createMessage(to: $to content: $content){
    to
    from
    sent
    content
  }
}`

export default function MessageInput({}) {

  const {id} = useParams()

  const [message, setMessage] = useState("")

  const [sendMessage, {data, loading, error}] = useMutation(CREATE_MESSAGE)
  
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
    <Box marginTop="1em" display="relative">
      <TextField
        label="New Message"
        fullWidth={true}
        onChange={onChange}
        multiline
        rows="4"
        value={message}
        variant="outlined"
      />
      <Box display="absolute" right="0" bottom="0">
        {sendButton}
      </Box>
      
    </Box>
  )
}