import React from "react";
import Box from "@material-ui/core/Box";

//Custom
import MessageUserList from "../components/messages/MessageUserList";
import MessageList from "../components/messages/MessageList";
import MessageInput from "../components/messages/MessageInput";
import Layout from "../components/Layout";

export default ({ isMobile }) => {
  return (
    <Layout dontUseFooter>
      <Box maxHeight="100vh" height="100vh" display="flex" flexDirection="column">
        <Box display="flex" flex="1 1 auto">
          {isMobile ? null : <MessageUserList />}
          <Box display="flex" flex="3 1 auto" flexDirection="column">
            <MessageList />
            <MessageInput />
          </Box>
        </Box>
        <Box height="1em" flex="0 0 auto" />
      </Box>
    </Layout>
  )
};
