import React from "react";
import List from "@material-ui/core/List";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from '@apollo/react-hooks'
import {GET_MATCHES} from '../../gqlTags'
import ListItem from './MatchListItem'
import tags from '../../gqlTags'

export default () => {

  const { loading, error, data } = useQuery(tags.readMatches)

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
          return <ListItem key={index} match={match} />;
        })}
      </List>
    </div>
  );
};
