import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Card, CardContent } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ErrorComponent from '../basic/ErrorComponent'
import LoadingComponent from '../basic/LoadingComponent'

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
    marginBottom: theme.spacing(5)
  }
}))

export default ({user}) => {
  const classes = useStyles()

  const {loading, error, data} = useQuery(READ_MATCHES)

  if(loading) return <LoadingComponent />
  if(error) return <ErrorComponent />

  const common = intersection(data.me.topArtists, user.topArtists)

  return (
    <Card>
      <CardContent>
        <Typography className={classes.heading} element="h2" variant='h6'>
          Wow, you two have a lot in common! (musically at least)
        </Typography>
        <Typography element="h4">
          Check-marks indicate an interest you share
        </Typography>
      </CardContent>
    </Card>
  )
}

const intersection = (array1, array2) => {
  return array1.filter(value => array2.includes(value))
}