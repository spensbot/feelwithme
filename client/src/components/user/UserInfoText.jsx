import React, { useState } from "react"
import { Button, Box, Divider, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

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

  const classes = useStyles();

  const initState = {
    displayNameEdit: user.displayName,
    bioEdit: user.bio,
    isEditing: false
  };

  const [state, setState] = useState(initState);

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

  const updateUserInfo = e => {
    //Todo
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
      value={state.bioEdit}
      onChange={setBio}
      multiline
      rows="4"
    />
  ) : (
    <>
      <Divider />
      <p>{user.bio || "This User Hasn't Created A Bio Yet"}</p>
    </>
  );

  let buttonsBlock = <Button variant="contained">message</Button>;
  if (editMode) {
    buttonsBlock = (
      <>
        <Button
          variant="contained"
          onClick={() => setIsEditing(false)}
          className={classes.spacedButton}
        >
          cancel
        </Button>
        <Button variant="contained" onClick={updateUserInfo}>
          save
        </Button>
      </>
    );
  } else if (isMe) {
    buttonsBlock = (
      <Button variant="contained" onClick={() => setIsEditing(true)}>
        edit info
      </Button>
    );
  }

  const UPDATE_PROFILE = gql`
  {
    updateProfile(displayName:"Hello" bio:"Sup"){
      displayName
      bio
    }
  }`

  useMutation()

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
