import React from 'react'
import Header from './sub1/Header'
import Footer from './sub1/Footer'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import AuthGate from '../utils/AuthGate'

//Custom
import MessageUserList from './messages/MessageUserList'
import MessageList from './messages/MessageList'
import MessageInput from './messages/MessageInput'


function Messages({isMobile}){

    return (
        <Container maxWidth="md">
            <AuthGate />
            <Box maxHeight="100vh" height="100vh" display="flex" flexDirection="column">
                <Header />
                <Box display='flex' flex='1 1 auto'>
                    {isMobile ? null : <MessageUserList /> }
                    <Box display='flex' flex='3 1 auto' flexDirection='column'>
                        <MessageList />
                        <MessageInput />
                    </Box>
                </Box>
                <Box height='1em' flex="0 0 auto" />
                {/* <Footer /> */}
            </Box>
        </Container>
    )
}

const mapStateToProps = state => ({
    isMobile: state.isMobile
})

export default connect(
    mapStateToProps
)(Messages)