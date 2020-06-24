import React from 'react'
import { makeStyles, Button, Typography, Input } from '@material-ui/core'
import Dialog from '../basic/Dialog'
import PublishIcon from '@material-ui/icons/Publish'
import { useState } from 'react'
import Resizer from 'react-image-file-resizer'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {setAlert} from '../../localCache'
import storageRef from '../../config/firebase'

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
    //objectFit: 'contain',
    //objectFit: 'none',
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

export default function ImageEditDialog({onClose, user}) {  

  var profilePicRef = storageRef.child('profile-pics').child(user.id)

  const client = useApolloClient()

  const classes = useStyles()

  const [file, setFile] = useState(null)

  const onCompleted = data => {
    setAlert(client, 'success', 'Profile Update', 2000)
  }
  const onError = error => {
    setAlert(client, 'error', 'Profile Update Failed')
  }
    
  const [updateProfile] = useMutation(UPDATE_PROFILE_PIC, {onCompleted: onCompleted, onError: onError})

  function onChange(e) {
    if (e.target.files[0]) {
      Resizer.imageFileResizer(
        e.target.files[0],
        512,
        512,
        'JPEG',
        80,
        0,
        uri => {
          var base64str = uri.substr(23)
          console.log(base64str)
          var decoded = atob(base64str)
          console.log("FileSize: " + decoded.length)
          setFile(uri)
        }
      )
    }
  }

  function uploadImage(e) {
    if (file) {
      profilePicRef.putString(file, 'data_url').then(function(snapshot) {
        console.log('Uploaded a data_url string!');
        profilePicRef.getDownloadURL()
        .then(url => {
          updateProfile({variables: {imageUrl: url}})
        })
        .catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      });
    }
  }

  return (
    <Dialog>
      <div className={classes.root}>
        <Typography variant="h6">Select A New Profile Picture</Typography>
        <Input className={classes.profileImageInput} type='file' id='profile-pic' inputProps={{ accept: 'image/*' }} onChange={onChange} />
        {file ?
          <div className={classes.imageWrapper}>
            <img className={classes.imagePreview} src={file} alt="uploaded"/>
          </div>
          : null}
        <div className={classes.buttons}>
          <Button disabled={!file} variant="contained" onClick={uploadImage}> <PublishIcon /> Upload</Button>
          <Button onClick={onClose}>Dismiss</Button>
        </div>
      </div>
    </Dialog>
  )
}
