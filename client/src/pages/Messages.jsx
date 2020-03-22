import React, {useState} from "react";

//Custom
import Layout from "../components/Layout"
import MessagesNarrow from "../components/MessagesNarrow";
import MessagesFullscreen from '../components/MessagesFullscreen'
import NoMessages from '../components/messages/NoMessages'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag' 
import ErrorPage from "../components/basic/ErrorPage";
import LoadingPage from "../components/basic/LoadingPage";

export const READ_MESSAGED_USERS = gql`
{
  messagedUsers
}`

export default () => {
  const [isNarrow, setIsNarrow] = useState(window.matchMedia('(max-width: 35rem)').matches)
  const {loading, error, data} = useQuery(READ_MESSAGED_USERS)

  React.useEffect(() => {
    function handleResize() {
      const newIsNarrow = window.matchMedia('(max-width: 35rem)').matches
      if (isNarrow != newIsNarrow)
        setIsNarrow(newIsNarrow)
    }

    window.addEventListener('resize', handleResize)
  })

  if(loading){
    return (
      <LoadingPage />
    )
  }
  
  if(error){
    return (
      <ErrorPage />
    )
  }

  if (data.messagedUsers.count == 0) {
    return (
      <NoMessages />
    )
  }

  return (
    <Layout dontUseFooter dontUseContainer fixHeight>
      {isNarrow ? <MessagesNarrow messagedUsers={data.messagedUsers}/>
      : <MessagesFullscreen messagedUsers={data.messagedUsers} />}
    </Layout>
  )
};
