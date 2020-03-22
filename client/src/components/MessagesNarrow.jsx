import React from "react";
//Custom
import MessageUserList from "../components/messages/MessageUserList"
import MessageView from '../components/messages/MessageView'
import { useParams } from "react-router-dom";

export default ({messagedUsers}) => {
  const {id} = useParams()

  return id ? <MessageView header/> : <MessageUserList messagedUsers={messagedUsers} />
};