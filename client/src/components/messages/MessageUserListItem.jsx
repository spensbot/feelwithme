import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box'
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import tags from '../gqlTags'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({

  listItemText: {
      marginBottom: theme.spacing(-.5),
      padding: 0
  },
  avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginRight: theme.spacing(2)
  },
  percentage: {
      fontSize: '2em'
  },
  selected: {
    border: '2px solid',
    borderColor: theme.palette.primary.main
  }
}))


function MessageUserListItem({userId}) {
  const classes = useStyles()
  const {id} = useParams()

  const {loading, error, data}=useQuery(tags.readUserShallow, {variables: {id: userId}})

  if (loading){
    return <h1>loading</h1>
  }
  
  if (error) {
    return <h1>Error</h1>
  }

  const root = (userId === id) ? classes.selected : null

  return (
    <>
      <ListItem component={Link} to={`/messages/${userId}`} button className={root}>
          <ListItemAvatar>
              <Avatar className={classes.avatar} alt="match" src={data.user.imageUrl} />
          </ListItemAvatar>
          <Box flex="1 1 auto" display="flex" flexDirection="column" justifyContent="center">
              <ListItemText className={classes.listItemText} primary={data.user.displayName} secondary={null} />
          </Box>
      </ListItem>
      {/* <Divider /> */}
    </>
  )
}

export default MessageUserListItem