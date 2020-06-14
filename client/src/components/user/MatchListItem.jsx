import React from 'react'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#0002'
  },
  listItemText: {
    marginBottom: theme.spacing(-0.5),
    padding: 0
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2)
  },
  percentage: {
    fontSize: "2em"
  }
}));

export default ({ match }) => {
  const classes = useStyles();

  const percentString = (match.weightedMatch * 100).toFixed(0) + "%";
  const artistString = match.artistCount + " Artists";
  const songString = match.trackCount + " Songs";
  const linkUrl = "/user/" + match.user.id;

  return (
    <>
      <ListItem className={classes.root} component={Link} to={linkUrl} button>
        <ListItemAvatar>
          <Avatar className={classes.avatar} alt="match" src={match.user.imageUrl} />
        </ListItemAvatar>
        <Box
          flex="1 1 auto"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <ListItemText
            className={classes.listItemText}
            primary={match.user.displayName}
            secondary={songString}
          />
          <ListItemText secondary={artistString} />
        </Box>

        <Typography className={classes.percentage}>{percentString}</Typography>
      </ListItem>
      <Divider />
    </>
  );
}