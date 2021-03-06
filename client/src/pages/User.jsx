import React from 'react'
//Material UI
import { makeStyles } from '@material-ui/core/styles'
//Apollo
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
//Custom
import MatchList from '../components/user/MatchList'
import UserInfo from '../components/user/UserInfo'
import SpotifyList from '../components/user/SpotifyList'
import MatchDescription from '../components/user/MatchDescription'
import Layout from '../components/Layout'
import Spacer from '../components/basic/Spacer'
import tags from '../gqlTags'
import LoadingPage from '../components/basic/LoadingPage'
import ErrorPage from '../components/basic/ErrorPage'
import ShareSection from '../components/user/ShareSection'


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
    return <LoadingPage />
  }

  if (error) {
    console.log(error)
    return <ErrorPage />
  }

  const isMe = data.me.id === id

  return (
    <Layout>
      <UserInfo isMe={isMe} user={data.user} me={data.me} />

      {isMe ? <ShareSection /> : <MatchDescription user={data.user}/>}
      
      <Spacer />
      
      {isMe ? <><MatchList user={data.user} /><Spacer /></> : null}
      
      <div className={classes.list}>
        <SpotifyList isMe={isMe} items={data.user.topArtists} me={data.me} />
      </div>

      <Spacer />

      <div className={classes.list}>
        <SpotifyList isMe={isMe} items={data.user.topTracks} me={data.me} isTracks />
      </div>

      <Spacer />

    </Layout>
  )
}