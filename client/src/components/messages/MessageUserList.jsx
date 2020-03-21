import React from 'react'
import List from '@material-ui/core/List'
import ListItem from './MessageUserListItem'
import { makeStyles } from '@material-ui/core';
import Divider from '../basic/Divider'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flex: '1'
  },
}))

export default function MessageUserList({messagedUsers}) {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List>
        {messagedUsers.map(userId => {
          return <ListItem key={userId} userId={userId} />
        })}
      </List>
    </div>
  )
}