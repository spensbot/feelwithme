import React from "react";
import List from "@material-ui/core/List";
import { useQuery } from '@apollo/react-hooks'
import ListItem from './MatchListItem'
import gql from 'graphql-tag'
import LoadingComponent from "../basic/LoadingComponent";
import ErrorComponent from "../basic/ErrorComponent";

export const READ_MATCHES = gql`
{
  matches{
    id
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

export default () => {

  const { loading, error, data } = useQuery(READ_MATCHES)

  if (loading) {
    return (
      <div className="song-list">
        <LoadingComponent />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <ErrorComponent />
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
