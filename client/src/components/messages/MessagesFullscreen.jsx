import React from "react";
import Box from "@material-ui/core/Box"
//Custom
import MessageUserList from "./MessageUserList"
import MessageView from './MessageView'
import { useParams } from "react-router-dom"
import SiteContainer from "../basic/SiteContainer";
import Divider from "../basic/Divider";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme  => ({
  root: {
    height: '100%'
  }
}))

export default ({messagedUsers}) => {
  const classes = useStyles()

  const {id} = useParams()

  return (
    <SiteContainer className={classes.root}>
      <Box height="100%" display="flex" flex="1 1 auto" width="100%">
        <MessageUserList messagedUsers={messagedUsers} />
        {id ? <>
          <Divider vertical color="#77777777" />
          <MessageView />
        </>: null}
      </Box>
    </SiteContainer>
  )
};
