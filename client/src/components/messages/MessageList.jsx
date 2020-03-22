import React from 'react'
import ListItem from './MessageListItem'
import Box from '@material-ui/core/Box'
import { useQuery } from '@apollo/react-hooks'
import tags from '../../gqlTags'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ErrorComponent from '../basic/ErrorComponent'
import LoadingComponent from '../basic/LoadingComponent'

const useStyles = makeStyles(theme => ({
  root: {
    
  },
}))

export default () => {

  const {id} = useParams()
  const classes = useStyles()
  const {loading, error, data}=useQuery(tags.readScopedMessages, {variables: {id}})

  if (loading){
    return <LoadingComponent />
  }
  
  if (error) {
    return <ErrorComponent />
  }

  function getDateString(date){
    const castDate = new Date(date)
    return castDate.toLocaleDateString("en-US")
  }

  return (
    <Box flex="1 1 auto" justifyContent="start" overflow="hidden" maxHeight="75vh" paddingTop="2rem">
      {data.scopedMessages.map((message) => {
        const isOutgoing = message.from === id
        const content = message.content
        const timeStamp = message.viewed
          ? `Viewed ${getDateString(message.viewed)}`
          : `Sent ${getDateString(message.sent)}`


        return <ListItem key={message.id} isOutgoing={isOutgoing} content={content} timeStamp={timeStamp} />
      })}
    </Box>
  )
}