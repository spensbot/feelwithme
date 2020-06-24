import React from "react"
import { Route, Redirect } from "react-router-dom"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

const QUERY = gql`{
  me {
    id
  }
}`

export default function PrivateRoute ({ component: Component, location, ...rest }) {
  const {data} = useQuery(QUERY)

  // If a user who isn't logged in tries to access a private route,
  // we remember the route they tried to access so they can be redirected there upon login
  if (!data.me) {
    localStorage.setItem('loginRedirect', location.pathname)
  } 

  const redirectPath = localStorage.getItem('loginRedirect')
  
  // If the user is logged in, and a redirect path exists
  if (data.me && redirectPath){
    // Remove the redirect path and redirect accordingly.
    localStorage.removeItem('loginRedirect')
    //history.push(redirectPath)
    return <Redirect to={redirectPath} />
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        data.me ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
