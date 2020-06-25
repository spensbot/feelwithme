import React from 'react'
import { makeStyles, Button, Typography, Input } from '@material-ui/core'
import Dialog from '../basic/Dialog'
import PublishIcon from '@material-ui/icons/Publish'
import { useState } from 'react'
import { useMutation, useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {setAlert} from '../../localCache'
import {compressImage} from '../../utils/imageProcessing'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '1rem 0'
    }
  },
  profileImageInput: {
    
  },
  buttons: {
    '& > *': {
      margin:  '0 0.5rem'
    }
  },
  imageWrapper: {
    width: '100%',
    paddingBottom: '100%',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0'
  }
}))

const UPDATE_PROFILE_PIC = gql`
mutation UpdateProfile($imageUrl: String){
  updateProfile(imageUrl: $imageUrl){
    id
    imageUrl
  }
}`

const GET_UPLOAD_URL = gql`{
  signedProfilePicUploadUrl
}`

export default function ImageEditDialog({onClose, user}) {  

  const client = useApolloClient()

  const classes = useStyles()

  const [state, setState] = useState({
    dataUrl: null,
    file: null
  })

  const onCompleted = data => {
    onClose()
    setAlert(client, 'success', 'Profile Update', 2000)
  }
  const onError = error => {
    setAlert(client, 'error', 'Profile Update Failed')
  }

  const { data } = useQuery(GET_UPLOAD_URL)
    
  const [updateProfile] = useMutation(UPDATE_PROFILE_PIC, {onCompleted: onCompleted, onError: onError})

  function onChange(e) {
    if (e.target.files[0]) {
      compressImage(e.target.files[0])
      .then(({file, base64}) => {
        setState({
          file: file,
          dataUrl: base64
        })
      })
    }
  }

  function uploadImage(e) {
    if (state.file) {
      fetch(data.signedProfilePicUploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg'
        },
        body: state.file
      })
      .then(res => {
        console.log(res)
        updateProfile({
          variables: {
            imageUrl: "https://feelwithme-profile-pics.s3-us-west-2.amazonaws.com/" + user.id + ".jpeg?random=" + Date.now()
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <Dialog>
      <div className={classes.root}>
        <Typography variant="h6">Select A New Profile Picture</Typography>
        <Input className={classes.profileImageInput} type='file' id='profile-pic' inputProps={{ accept: 'image/*' }} onChange={onChange} />
        {state.dataUrl ?
          <div className={classes.imageWrapper}>
            <img className={classes.imagePreview} src={state.dataUrl} alt="uploaded"/>
          </div>
          : null}
        <div className={classes.buttons}>
          <Button disabled={!state.file} variant="contained" onClick={uploadImage}> <PublishIcon /> Upload</Button>
          <Button onClick={onClose}>Dismiss</Button>
        </div>
      </div>
    </Dialog>
  )
}
