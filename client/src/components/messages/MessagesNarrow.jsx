import React from "react";
//Custom
import MessageUserList from "./MessageUserList"
import MessageView from './MessageView'
import { useParams } from "react-router-dom";

export default ({messagedUsers}) => {
  const {id} = useParams()

  return id ? <MessageView header/> : <MessageUserList messagedUsers={messagedUsers} />
};