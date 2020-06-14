import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CommonIndicator from './CommonIndicator'
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: theme.spacing(2),
  },
  number: {
      marginRight: '1rem'
  },
  root: {
    backgroundColor: '#0002'
  },
  common: {
    boxShadow: 'inset 0 0 1rem #1d15',
  }
}))


export default ({item, index, isMatch}) => {
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
  <div className={classes.root}>
    <ListItem className={isMatch ? classes.common : null} button component="a" href={spotifyUrl} target="_blank">
        {/* <Typography className={classes.number}>{`${index + 1}`}</Typography> */}
        <ListItemAvatar>
        <Avatar className={classes.avatar} alt="song" src={imageUrl}/>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={secondary}/>
        <Typography className={classes.number}>{`${index + 1}`}</Typography>
        {/* {isMatch ? <CommonIndicator /> : null} */}
    </ListItem>
    <Divider />
  </div>
  )
}