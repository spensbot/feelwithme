import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const useStyles = makeStyles(theme => ({
  root: {},
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

function MatchListItem({ match }) {
  const classes = useStyles();

  const percentString = (match.weightedMatch * 100).toPrecision(2) + "%";
  const artistString = match.artistCount + " Artists";
  const songString = match.trackCount + " Songs";
  const linkUrl = "/users/" + match.user.id;

  return (
    <>
      <ListItem component={Link} to={linkUrl} button>
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

export default () => {

  const GET_MATCHES = gql`
    {
      matches{
        user{
          id
          displayName
          spotifyProfileUrl
          bio
          imageUrl
        }
        trackCount
        artistCount
        weightedMatch
      }
    }`

  const { loading, error, data } = useQuery(GET_MATCHES)

  if (loading) {
    return (
      <div className="song-list">
        <h1>Your Matches</h1>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h3>There Was an Error</h3>
        <p>Try Refreshing</p>
      </div>
    )
  }

  return (
    <div className="song-list">
      <h1>Your Matches</h1>
      <List>
        {data.matches.map((match, index) => {
          return <MatchListItem key={index} match={match} />;
        })}
      </List>
    </div>
  );
};
