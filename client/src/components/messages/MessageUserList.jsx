import React from 'react'
import List from '@material-ui/core/List'
import ListItem from './MessageUserListItem'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#00000033',
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