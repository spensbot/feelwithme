import React from 'react'
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box'
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { requestStates } from '../../redux/reducers'

const useStyles = makeStyles(theme => ({
  root: {

  },
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
  }
}))


function MessageUserListItem({}) {
  const classes = useStyles

  return (
    <>
      <ListItem component={Link} to={'#'} button>
          <ListItemAvatar>
              <Avatar className={classes.avatar} alt="match" src={match.imageUrl} />
          </ListItemAvatar>
          <Box flex="1 1 auto" display="flex" flexDirection="column" justifyContent="center">
              <ListItemText className={classes.listItemText} primary={match.spotifyId} secondary={songString} />
              <ListItemText secondary={artistString} />
          </Box>

          <Typography className={classes.percentage}>{percentString}</Typography>
      </ListItem>
      <Divider />
    </>
  )
}

export default MessageUserListItem