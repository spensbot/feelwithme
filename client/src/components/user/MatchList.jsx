import React, { useState } from "react";
import List from "@material-ui/core/List";
import { useQuery } from '@apollo/react-hooks'
import ListItem from './MatchListItem'
import gql from 'graphql-tag'
import LoadingComponent from "../basic/LoadingComponent";
import ErrorComponent from "../basic/ErrorComponent";
import { Typography, Box, Button } from "@material-ui/core";
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

export default () => {

  const { loading, error, data } = useQuery(READ_MATCHES)

  const [ limit, setLimit ] = useState(5)

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
          if (index < limit) return <ListItem key={index} match={match} />
          else return null
        })}
      </List>
      <Box display="flex" justifyContent="center">
        {
          limit > 5
          ? 
          <Button onClick={() => setLimit(5)}>Show Less -</Button>
          :
          <Button onClick={() => setLimit(10)}>Show More +</Button>
        }
      </Box>
    </div>
  );
};
