import React from "react";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import UserInfoText from "./UserInfoText";

const useStyles = makeStyles(theme => ({
  userInfo: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  },
  userImage: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginRight: theme.spacing(5)
  }
}));

export default ({ isMe, user }) => {
  const classes = useStyles();

  return (
    <Box className={classes.userInfo} display="flex" flexWrap="wrap">
      <Avatar
        className={classes.userImage}
        src={user.imageUrl}
        alt={user.displayName}
      />
      <UserInfoText isMe={isMe} user={user} />
    </Box>
  );
};
