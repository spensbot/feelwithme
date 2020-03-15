import React from 'react'
//Material UI
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
//Apollo
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useParams } from 'react-router-dom'
//Custom
import MatchList from '../components/user/MatchList'
import UserInfo from '../components/user/UserInfo'
import BasicList from '../components/user/BasicList'
import MatchDescription from '../components/user/MatchDescription'
import Loading from '../components/user/Loading'
import Layout from '../components/Layout'
import Spacer from '../components/basic/Spacer'


const useStyles = makeStyles(theme => ({
  list: {
    flexGrow: '1'
  }
}))

//--------------------     REACT COMPONENT     --------------------

export default () => {

  const {id} = useParams()

  const classes = useStyles()

  const GET_USER = gql`
  {
    user(id: "${id}"){
      spotifyId
      spotifyProfileUrl

      id
      displayName
      isInitialized
      bio
      imageUrl
      
      topTracks{
        name
        artistName
        spotifyUrl
        imageUrl
      }
      topArtists{
        name
        spotifyUrl
        imageUrl
      }
    }

    me {
      spotifyId
      spotifyProfileUrl

      id
      displayName
      isInitialized
      bio
      imageUrl
      
      topTracks{
        name
        artistName
        spotifyUrl
        imageUrl
      }
      topArtists{
        name
        spotifyUrl
        imageUrl
      }
    }

  }`

  const { loading, error, data } = useQuery(GET_USER)

  if (loading) {
    return <h1>"Hey Spotify, can we have some info please?"</h1>
  }

  if (error) {
    console.log(error)
    return <h1>There was an Error</h1>
  }

  const isMe = data.me.id === id

  return (
    <Layout me={data.me}>
      <UserInfo isMe={isMe} user={data.user} me={data.me} />

      <Spacer />

      {isMe ? <MatchList user={data.user} /> : <MatchDescription user={data.user}/>}

      <Spacer />

      <Box display="flex" flexWrap="wrap">
        <div className={classes.list}>
          <BasicList isMe={isMe} items={data.user.topArtists} me={data.me} />
        </div>

        <Spacer />

        <div className={classes.list}>
          <BasicList isMe={isMe} items={data.user.topTracks} me={data.me} isTracks />
        </div>
      </Box>

    </Layout>
  )
}