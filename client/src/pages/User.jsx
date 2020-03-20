import React from 'react'
//Material UI
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
//Apollo
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
//Custom
import MatchList from '../components/user/MatchList'
import UserInfo from '../components/user/UserInfo'
import BasicList from '../components/user/SpotifyList'
import MatchDescription from '../components/user/MatchDescription'
import Layout from '../components/Layout'
import Spacer from '../components/basic/Spacer'
import tags from '../components/gqlTags'


const useStyles = makeStyles(theme => ({
  list: {
    flex: '1 1 auto'
  }
}))

//--------------------     REACT COMPONENT     --------------------

export default () => {

  const {id} = useParams()

  const classes = useStyles()

  const { loading, error, data } = useQuery(tags.readUser, {variables: {id: id}})

  if (loading) {
    return <h1>"Hey Spotify, can we have some info please?"</h1>
  }

  if (error) {
    console.log(error)
    return <h1>There was an Error</h1>
  }

  const isMe = data.me.id === id

  return (
    <Layout>
      <UserInfo isMe={isMe} user={data.user} me={data.me} />

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