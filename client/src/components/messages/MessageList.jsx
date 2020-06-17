import React from 'react'
import ListItem from './MessageListItem'
import { useQuery } from '@apollo/react-hooks'
import tags from '../../gqlTags'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ErrorComponent from '../basic/ErrorComponent'
import LoadingComponent from '../basic/LoadingComponent'

const useStyles = makeStyles(theme => ({
  root: {
    overflowY: 'scroll',
    justifyContent: 'start',
    paddingTop: '1rem',
    flex: '1 1 auto'
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

  console.log(data.scopedMessages)

  return (
    <div className={classes.root}>
      {data.scopedMessages.map((message) => {
        const isOutgoing = message.from === id
        const content = message.content
        const timeStamp = message.viewed ?
          `Viewed ${getDateString(message.viewed)}`
          : `Sent ${getDateString(message.sent)}`

        return <ListItem key={message.id} isOutgoing={isOutgoing} content={content} timeStamp={timeStamp} />
      })}
    </div>
  )
}