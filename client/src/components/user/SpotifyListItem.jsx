import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  artist: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
    borderRadius: '0'
  },
  album: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
    borderRadius: '0'
  },
  number: {
      marginRight: '1rem'
  },
  root: {
    //backgroundColor: '#0001',
    backgroundColor: theme.palette.background.paper
  },
  common: {
    boxShadow: 'inset 0 0 1rem #1d15',
  }
}))


export default ({isTrack, item, index, isMatch}) => {
  const classes = useStyles()
  const spotifyUrl = item.spotifyUrl;

  let imageUrl
  let secondary
  imageUrl = item.imageUrl

  return (
  <div className={classes.root}>
    <ListItem className={isMatch ? classes.common : null} button component="a" href={spotifyUrl} target="_blank">
        {/* <Typography className={classes.number}>{`${index + 1}`}</Typography> */}
        <ListItemAvatar>
        <Avatar className={isTrack ? classes.album : classes.artist} alt="song" src={imageUrl}/>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={secondary}/>
        <Typography className={classes.number}>{`${index + 1}`}</Typography>
        {/* {isMatch ? <CommonIndicator /> : null} */}
    </ListItem>
    <Divider />
  </div>
  )
}