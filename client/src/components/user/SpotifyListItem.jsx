import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CommonIndicator from './CommonIndicator'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: theme.spacing(2),
  },
  number: {
      fontSize: '1.5em',
      fontWeight: 'lighter'
  }
}))


export default ({item, isMatch}) => {
  const classes = useStyles()
  const spotifyUrl = item.spotifyUrl;

  let imageUrl
  let secondary
  if (item.imageUrl){ //Artist
      imageUrl = item.imageUrl
      secondary = "Popularity " + item.popularity 
      secondary = ""
  } else { //Song
      imageUrl = item.album.imageUrl
      secondary = item.artistName
  }

  return (
  <>
      <ListItem button component="a" href={spotifyUrl} target="_blank">
          <ListItemAvatar>
              <Avatar className={classes.avatar} alt="song" src={imageUrl}/>
          </ListItemAvatar>
          <ListItemText primary={item.name} secondary={secondary}/>
          {isMatch ? <CommonIndicator /> : null}
      </ListItem>
      <Divider />
  </>
  )
}