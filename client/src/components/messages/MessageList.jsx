import React from 'react'
import MessageListItem from './MessageListItem'
import Box from '@material-ui/core/Box'

export default function MessageList({messages}) {
  messages = [
    {
      from: "This User",
      to: "Other User",
      sent: 'earlier',
      received: 'now',
      content: "Hello Dude"
    },
    {
      from: "Other User",
      to: "This User",
      sent: 'now',
      received: 'later',
      content: "Hello Dude"
    },
    {
      from: "Other User",
      to: "This User",
      sent: 'now',
      received: 'later',
      content: "Hello Dude"
    },
    {
      from: "This User",
      to: "Other User",
      sent: 'earlier',
      received: 'now',
      content: "Hello Dude"
    },
    {
      from: "This User",
      to: "Other User",
      sent: 'earlier',
      received: 'now',
      content: "Hello Dude"
    },
    {
      from: "Other User",
      to: "This User",
      sent: 'now',
      received: 'later',
      content: "Hello Dude"
    },
    {
      from: "Other User",
      to: "This User",
      sent: 'now',
      received: 'later',
      content: "Hello Dude"
    },
    {
      from: "This User",
      to: "Other User",
      sent: 'earlier',
      received: 'now',
      content: "Hello Dude"
    },
  ]

  return (
    <Box flex="1 1 auto" justifyContent="start" overflow="scroll" maxHeight="75vh" paddingTop="2rem">
      {messages.map((message, index) => {
        return <MessageListItem isOutgoing={message.from === "This User"} />
      })}
    </Box>
  )
}