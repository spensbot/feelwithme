import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams, Redirect, Link } from 'react-router-dom'
import { makeStyles, Button, Avatar } from '@material-ui/core'
import gql from 'graphql-tag' 
import config from '../../config'
import LoadingComponent from '../basic/LoadingComponent'
import ErrorComponent from '../basic/ErrorComponent'


export const READ_USER_DATA = gql`
query UserData($id: ID!){
  user(id: $id){
    id
    spotifyId
    spotifyProfileUrl
    isInitialized
    displayName
    bio
    imageUrl
  }
}`

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    alignItems: 'center',
    backgroundColor: '#00000011',
    padding: '.5rem'
  },
  name: {
    marginLeft: '.5rem',
    marginRight: 'auto'
  }

}))

export default () => {
  const {id} = useParams()
  const {loading, error, data} = useQuery(READ_USER_DATA, {variables: {id}})

  const classes = useStyles()

  if(loading){
    return (
      <LoadingComponent />
    )
  }
  if(error){
    return (
      <ErrorComponent />
    )
  }

  if(!data.user){
    return <Redirect to={config.routes.messages}></Redirect>
  }
  

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} alt="match" src={data.user.imageUrl} />
      <p className={classes.name}>{data.user.displayName}</p>
      <Button variant="contained" component={Link} to={config.routes.messages}>{"back"}</Button>
    </div>
  )
}