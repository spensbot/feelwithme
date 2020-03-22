import React from "react";
import Box from "@material-ui/core/Box"
//Custom
import MessageUserList from "../components/messages/MessageUserList"
import MessageView from '../components/messages/MessageView'
import { useParams } from "react-router-dom"
import SiteContainer from "./basic/SiteContainer";
import Divider from "./basic/Divider";

export default ({messagedUsers}) => {

  const {id} = useParams()

  return (
    <SiteContainer>
      <Box display="flex" flex="1 1 auto" width="100%">
        <MessageUserList messagedUsers={messagedUsers} />
        {id ? <>
          <Divider vertical color="#77777777" />
          <MessageView />
          
        </>: null}
      </Box>
    </SiteContainer>
  )
};
