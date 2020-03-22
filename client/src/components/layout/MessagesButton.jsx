import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Config from '../../config'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import gql from 'graphql-tag'
import {Badge, IconButton} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'

const GET_NEW_MESSAGES = gql`{
  newMessages{
    id
    from
  }
}`

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(2),
  }
}))

export default () => {
  const classes = useStyles()
  const {data, loading, error} = useQuery(GET_NEW_MESSAGES)

  console.log(data)

  const numNewMessages = data ? data.newMessages.length : 0

  return (
    <IconButton component={Link} to={Config.routes.messages} edge="start" className={classes.root} color="inherit" aria-label="menu">
      <Badge badgeContent={numNewMessages} color="primary">
          <ChatIcon />
      </Badge>
    </IconButton>
  )
}
