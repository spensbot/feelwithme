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

export default function PrivateRoute ({ component: Component, ...rest }) {
  const {data} = useQuery(QUERY)

  return (
    <Route
      {...rest}
      render={(props) =>
        data.me ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
