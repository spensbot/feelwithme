import React from "react";
import Box from "@material-ui/core/Box"
//Custom
import MessageUserList from "../components/messages/MessageUserList"
import MessageView from '../components/messages/MessageView'
import { useParams } from "react-router-dom"
import NoSelectedUser from './messages/NoSelectedUser'
import SiteContainer from "./basic/SiteContainer";
import { Container } from "@material-ui/core";

export default ({messagedUsers}) => {

  const {id} = useParams()

  return (
    <SiteContainer>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flex="1 1 auto" width="100%">
          <MessageUserList messagedUsers={messagedUsers} />
          {id ? <MessageView /> : null}
        </Box>
      </Box>
    </SiteContainer>
  )
};
