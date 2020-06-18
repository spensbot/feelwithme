import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Card, CardContent, Button } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ErrorComponent from '../basic/ErrorComponent'
import LoadingComponent from '../basic/LoadingComponent'
import { Link } from 'react-router-dom'
import ChatIcon from '@material-ui/icons/Chat'
import Spacer from '../basic/Spacer'

export const READ_MATCHES = gql`
{
  me{
    id
    topArtists{
      id
    }
    topTracks{
      id
    }
  }
}`

const useStyles = makeStyles(theme => ({
  heading: {
    backgroundColor: 'rgb(205, 40, 95)',
    borderRadius: '10rem',
    padding: '0.3rem 1.0rem',
    alignSelf: 'flex-start',
    color: 'whitesmoke',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '-1rem',
  },
  description: {
    margin: '1rem',
    flexGrow: 1,
  }
}))

const includesID = (array, id) => {
  for (let i=0 ; i<array.length ; i++){
    if (array[i].id === id){
      return true
    }
  }
  return false
}

const intersection = (array1, array2) => {
  return array1.filter(item => {
    return includesID(array2, item.id)
  })
}

export default ({user}) => {
  const classes = useStyles()

  const {loading, error, data} = useQuery(READ_MATCHES)

  if(loading) return <LoadingComponent />
  if(error) return <ErrorComponent />

  
  const commonArtists = intersection(data.me.topArtists, user.topArtists)
  const commonTracks = intersection(data.me.topTracks, user.topTracks)
  const trackWeight = 0.7
  const artistRatio = commonArtists.length/data.me.topArtists.length
  const trackRatio = commonTracks.length/data.me.topTracks.length
  const matchPercent = (artistRatio * (1-trackWeight) + trackRatio * trackWeight) * 100

  return (
    <Card elevation={5}>
      <CardContent>
        <Typography variant="h4">Match Analysis</Typography><Typography></Typography>
        <Spacer percent={50}/>
        <div className={classes.content}>
          <div className={classes.description}>
            <div className={classes.heading}>
              <Typography variant='h4'>
                {matchPercent.toPrecision(2)}%
              </Typography>
              <div style={{minWidth: '5rem'}}>
                <Typography>{commonArtists.length} Artists</Typography>  
                <Typography>{commonTracks.length} Songs</Typography>  
              </div>
            </div>
          </div>
          {/* <Divider vertical color="#8888" marginX="1rem"/> */}
          <Button style={{alignSelf: 'center', margin: '1rem'}} variant="contained" component={Link} to={`/messages/${user.id}`}>
            <ChatIcon style={{marginRight: '0.5rem'}}/>
            Send Them A Message
          </Button>
        </div>
        <Spacer percent={30}/>
        <Typography>Common interests are highlighted below</Typography>
      </CardContent>
    </Card>
  )
}