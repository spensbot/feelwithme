import React from "react";
import List from "@material-ui/core/List";
import { useQuery } from '@apollo/react-hooks'
import ListItem from './MatchListItem'
import gql from 'graphql-tag'
import LoadingComponent from "../basic/LoadingComponent";
import ErrorComponent from "../basic/ErrorComponent";
import { Typography, makeStyles } from "@material-ui/core";
import Spacer from "../basic/Spacer";

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

const useStyles = makeStyles(theme => ({
  title: {
    padding: '0.5rem',
    backgroundColor: theme.palette.background.default
  }
}))

export default () => {

  const { loading, error, data } = useQuery(READ_MATCHES)

  if (loading) {
    return (
      <div>
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
    <div>
      <Typography variant="h4">Your Matches</Typography>
      <Spacer percent={30}/>
      <List>
        {data.matches.map((match, index) => {
          return <ListItem key={index} match={match} />;
        })}
      </List>
    </div>
  );
};
