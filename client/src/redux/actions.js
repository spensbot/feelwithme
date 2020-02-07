import axios from 'axios'
import Config from '../config'

//-------------------       ACTIONS       --------------------------

export const actions = {
    //Entire Site
    SET_MAIN_MENU: 'SET_MAIN_MENU',
    SET_USER_MENU: 'SET_USER_MENU',
    SET_THEME: 'SET_THEME',
    SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',
    SET_IS_MOBILE: 'SET_IS_MOBILE',

    //User Home Page
    SET_EDIT_INFO: 'SET_EDIT_INFO',
    SET_EDITED_NAME: 'SET_EDITED_NAME',
    SET_EDITED_BIO: 'SET_EDITED_BIO',
    
    //Message Page
    SET_MESSAGE_INPUT: 'SET_MESSAGE_INPUT',

    //API ACTIONS
    GET_MAIN_USER_SEND: 'GET_MAIN_USER_SEND',
    GET_MAIN_USER_RECEIVE: 'GET_MAIN_USER_RECEIVE',
    GET_OTHER_USER_SEND: 'GET_OTHER_USER_SEND',
    GET_OTHER_USER_RECEIVE: 'GET_OTHER_USER_RECEIVE',
    GET_MATCHES_SEND: 'GET_MATCHES_SEND',
    GET_MATCHES_RECEIVE: 'GET_MATCHES_RECEIVE',
    PATCH_USER_INFO_SEND: 'PATCH_USER_INFO_SEND',
    PATCH_USER_INFO_RECEIVE: 'PATCH_USER_INFO_RECEIVE',

    //SOCKET IO ACTIONS
    WS_SET_STATE: 'WS_SET_STATE',
    WS_SEND_MESSAGE: 'WS_SEND_MESSAGE',
    WS_RECEIVE_MESSAGE: 'WS_RECEIVE_MESSAGE',
    WS_RECEIVE_MESSAGES: 'WS_RECEIVE_MESSAGES',
    WS_CONNECT: 'WS_CONNECT',
    WS_DISCONNECT: 'WS_DISCONNECT'
}

//--------------------       ACTION CREATORS (synchronous)      --------------------

export const setMainMenu = (anchorEl) => ({ type: actions.SET_MAIN_MENU, anchorEl: anchorEl })

export const setUserMenu = (anchorEl) => ({ type: actions.SET_USER_MENU,  anchorEl: anchorEl })

export const setEditInfo = (isEditing, name = null, bio = null) => ({
    type: actions.SET_EDIT_INFO,
    isEditing: isEditing,
    name: name,
    bio: bio
})

export const setErrorMessage = (errorMessage) => ({ type: actions.SET_ERROR_MESSAGE, errorMessage: errorMessage })

export const setTheme = (darkTheme) => ({ type: actions.SET_THEME, darkTheme: darkTheme })

export const setIsMobile = (isMobile) => ({ type: actions.SET_IS_MOBILE, isMobile: isMobile})

const getMainUserSend = () => ({ type: actions.GET_MAIN_USER_SEND })
const getMainUserReceive = (err, user = null) => ({
    type: actions.GET_MAIN_USER_RECEIVE,
    err: err,
    user: user
})

const getOtherUserSend = (otherUserId) => ({ type: actions.GET_OTHER_USER_SEND, otherUserId: otherUserId })
const getOtherUserReceive = (otherUserId, err, user = null) => ({
    type: actions.GET_OTHER_USER_RECEIVE,
    otherUserId: otherUserId,
    err: err,
    user: user
})

const getMatchesSend = () => ({ type: actions.GET_MATCHES_SEND })
const getMatchesReceive = (err, matches = null) => ({
    type: actions.GET_MATCHES_RECEIVE,
    err: err,
    matches: matches
})

const patchUserInfoSend = () => ({ type: actions.PATCH_USER_INFO_SEND })
const patchUserInfoReceive = (err, user = null) => ({
    type: actions.PATCH_USER_INFO_RECEIVE,
    err: err,
    user: user
})

export const wsSetState = wsState => ({ type: actions.WS_SET_STATE, wsState: wsState })

export const setMessageInput = (message, userId) => ({ 
    type: actions.SET_MESSAGE_INPUT,
    message: message,
    userId: userId
})

export const wsReceiveMessages = (userIds, byUserId) => ({
    type: actions.WS_RECEIVE_MESSAGES,
    userIds:userIds,
    byUserId: byUserId
})

export const wsReceiveMessage = (message) => ({
    type: actions.WS_RECEIVE_MESSAGE,
    message: message
})

//-------------------         ASYNC ACTION CREATORS (WEB-SOCKET)       -------------------

export const wsSendMessage = message => ({ type: actions.WS_SEND_MESSAGE, message: message})
export const wsConnect = () => ({ type: actions.WS_CONNECT })
export const wsDisconnect = () => ({ type: actions.WS_DISCONNECT })

//-------------------         ASYNC ACTION CREATORS (AJAX Requests)       -------------------

export function patchUserInfo(newName, newBio) {
    return dispatch => {

        dispatch(patchUserInfoSend())

        axios.patch(
                Config.serverRoutes.mainUserUrl,
                {newDisplayName: newName, newBio: newBio},
                {withCredentials: true}
            )
            .then(function(response) {
                if (response.data.success === false) {
                    dispatch(patchUserInfoReceive(response.data.body))
                    dispatch(setErrorMessage('Server Error: Could not update profile info'))
                } else {
                    dispatch(patchUserInfoReceive(null, response.data.body))
                }
            })
            .catch(function(err){
                dispatch(patchUserInfoReceive(err))
                dispatch(setErrorMessage('Network Error: Could not update profile info'))
            }) 
    }
}

export function getMainUser() {
    return dispatch => {

        dispatch(getMainUserSend())

        axios.get(Config.serverRoutes.mainUserUrl, {withCredentials: true})

            .then(function(response) { 
                if (response.data.success === false) {
                    //There was a server error when creating the response
                    dispatch(getMainUserReceive(response.data.body))
                    dispatch(setErrorMessage('Server Error: Authentication failure'))
                } else {
                    //Successful request. If body is null, the user is not authenticated
                    dispatch(getMainUserReceive(null, response.data.body))
                }
            }) 
            .catch(function(err) { 
                dispatch(getMainUserReceive(err))
                dispatch(setErrorMessage('Network Error: Autentication failure'))
            })
    }
}

export function getOtherUser(otherUserId) {
    return dispatch => {

        dispatch(getOtherUserSend(otherUserId))

        axios.get(Config.serverRoutes.otherUsersUrl + otherUserId, {withCredentials: true})

            .then(function(response) { 
                if (response.data.success === false) {
                    dispatch(getOtherUserReceive(otherUserId, response.data.body))
                    dispatch(setErrorMessage('Server error: Could not get user'))
                } else {
                    dispatch(getOtherUserReceive(otherUserId, null, response.data.body))
                }
            }) 
                    
            .catch(function(err) { 
                dispatch(getOtherUserReceive(otherUserId, err))
                dispatch(setErrorMessage('Network Error: Could not get user'))
            })
    }
}

export function getMatches(){
    return dispatch => {
        
        dispatch(getMatchesSend())

        axios.get(Config.serverRoutes.matchesUrl, {withCredentials: true})

            .then( response => {
                if (response.data.success === false) {
                    dispatch(getMatchesReceive(response.data.body))
                    dispatch(setErrorMessage('Server Error: Could not calculate matches'))
                } else {
                    dispatch(getMatchesReceive(null, response.data.body))
                }
            })

            .catch( err => {
                dispatch(getMatchesReceive(err))
                dispatch(setErrorMessage('Network Error: Could not get matches'))
            })
    }
}