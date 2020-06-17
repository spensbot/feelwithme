import React, {useState} from "react"

//Custom
import Layout from "../components/Layout"
import MessagesNarrow from "../components/messages/MessagesNarrow"
import MessagesFullscreen from '../components/messages/MessagesFullscreen'
import NoMessages from '../components/messages/NoMessages'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag' 
import ErrorPage from "../components/basic/ErrorPage"
import LoadingPage from "../components/basic/LoadingPage"
import { useParams } from "react-router-dom"

export const READ_MESSAGED_USERS = gql`
{
  messagedUsers
  matches {
    id
  }
}`

export default () => {
  const {id} = useParams()
  const [isNarrow, setIsNarrow] = useState(false)
  const {loading, error, data} = useQuery(READ_MESSAGED_USERS)

  function updateSize() {
    const newIsNarrow = window.matchMedia('(max-width: 35rem)').matches
    if (isNarrow !== newIsNarrow)
      setIsNarrow(newIsNarrow)
  }

  React.useEffect(() => {
    updateSize()
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
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

  if (data.messagedUsers.length === 0 && !id) {
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
