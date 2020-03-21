import React, { useState } from "react"
import { Button, Box, Divider, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from 'react-router-dom'
import gqlTags from '../../gqlTags'
import { useMutation } from '@apollo/react-hooks'

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

  const [updateProfile, {loading, error, data}] = useMutation(gqlTags.updateProfile)

  const statusDisplay = null
  // if (loading) statusDisplay = <h1>Saving Your Data</h1>
  // if (error) statusDisplay = <h1>There was an Error. Please refresh and try again.</h1>

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

  let buttonsBlock = <Button variant="contained" component={Link} to={`/messages/${user.id}`}>Message</Button>;
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
      {statusDisplay}
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
