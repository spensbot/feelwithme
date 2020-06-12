import React from "react";
import { Route, Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const QUERY = gql`
  {
    me {
      id
    }
  }
`;

export default function PublicRoute ({ component: Component, restricted, ...rest }) {

  const {data} = useQuery(QUERY)

  return (
    <Route
      {...rest}
      render={(props) =>
        data.me && restricted ? <Redirect to={`/user/${data.me.id}`} /> : <Component {...props} />
      }
    />
  );
};