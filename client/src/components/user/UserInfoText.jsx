import React, { useState } from "react"
import { Button, Box, Divider, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import gqlTags from '../../gqlTags'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import {setAlert} from '../../localCache'

const useStyles = makeStyles(theme => ({
  spacedButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  nameField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export default ({ isMe, user }) => {

  const initState = {
    displayNameEdit: user.displayName,
    bioEdit: user.bio,
    isEditing: false
  };

  const classes = useStyles()

  const [state, setState] = useState(initState)

  const client = useApolloClient()

  const setDisplayName = e => {
    setState({
      ...state,
      displayNameEdit: e.target.value
    });
  };
  const setBio = e => {
    setState({
      ...state,
      bioEdit: e.target.value
    });
  };
  const setIsEditing = isEditing => {
    setState({
      ...initState,
      isEditing: isEditing
    });
  };

  const onCompleted = data => {
    setAlert(client, 'success', 'Profile Update', 2000)
    setState(initState)
  }
  const onError = error => {
    setAlert(client, 'error', 'Profile Update Failed')
  }

  const [updateProfile] = useMutation(gqlTags.updateProfile, {onCompleted: onCompleted, onError: onError})

  const updateUserInfo = e => {
    updateProfile({ variables: { bio: state.bioEdit, displayName: state.displayNameEdit } })
  };

  const editMode = isMe && state.isEditing;

  const nameBlock = editMode ? (
    <TextField
      label="Name"
      fullWidth={true}
      value={state.displayNameEdit}
      onChange={setDisplayName}
    />
  ) : (
    <Typography variant="h4">{user.displayName}</Typography>
  );

  const bioBlock = editMode ? (
    <TextField
      label="Bio"
      value={state.bioEdit || ""}
      onChange={setBio}
      multiline
      rows="4"
    />
  ) : (
    <>
      <Divider />
      <p style={{wordBreak: 'break-all'}}>{user.bio || "This User Hasn't Created A Bio Yet"}</p>
    </>
  );

  let buttonsBlock = null;
  if (editMode) {
    buttonsBlock = (
      <>
        <Button
          variant="contained"
          onClick={() => setIsEditing(false)}
          className={classes.spacedButton}
        > cancel </Button>

        <Button variant="contained" onClick={updateUserInfo}>
          save
        </Button>
      </>
    );
  } else if (isMe) {
    buttonsBlock = (
      <Button variant="contained" onClick={() => setIsEditing(true)}>
        edit
      </Button>
    );
  }

  return (
    <Box display="flex" flexDirection="column" flex="1 1 0">
      <Box
        className={classes.nameField}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box flex="1 1 auto">{nameBlock}</Box>
        {buttonsBlock}
      </Box>
      {bioBlock}
    </Box>
  );
};
