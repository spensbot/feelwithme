import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import tags from '../../gqlTags'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../basic/LoadingComponent';
import ErrorComponent from '../basic/ErrorComponent';

const selectedBorderWidth = 2
const padding = 8

const useStyles = makeStyles(theme => ({
  

  listItemText: {
      
  },
  avatar: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      marginRight: theme.spacing(2)
  },
  percentage: {
      fontSize: '2em'
  },
  notSelected: {
    padding: `${padding}px`
  },
  selected: {
    border: `${selectedBorderWidth}px solid`,
    borderColor: theme.palette.primary.main,
    padding: `${padding - selectedBorderWidth}px`
  }
}))


function MessageUserListItem({userId}) {
  const classes = useStyles()
  const {id} = useParams()

  const {loading, error, data}=useQuery(tags.readUserShallow, {variables: {id: userId}})

  if (loading){
    return <LoadingComponent />
  }
  
  if (error) {
    return <ErrorComponent />
  }

  const root = (userId === id) ? classes.selected : classes.notSelected

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
      {/* <Divider color="#77777755" /> */}
    </>
  )
}

export default MessageUserListItem