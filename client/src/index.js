import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import config from './config'
import {initCache} from './localCache'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: config.serverRoutes.graphQLUrl,
  credentials: "include",
  cache: cache
})

initCache(cache);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
  , document.getElementById('root')
)