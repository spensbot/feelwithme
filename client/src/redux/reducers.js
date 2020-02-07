import { actions } from "./actions"
import { combineReducers } from 'redux'

export const requestStates = {
    NOT_MADE: 'NOT_MADE',
    FETCHING: 'FETCHING',
    FAILURE: 'FAILURE',
    SUCCESS: 'SUCCESS'
}

export const wsStates = {
    DISCONNECTED: 'DISCONNECTED',
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    DISCONNECTING: 'DISCONNECTING'
}

//---------------------     INITIAL STATE     ------------------------

const initState = {
    mainUser: {
        requestState: requestStates.NOT_MADE,
        requestAttempts: 0,
        user: null
    },
    editInfo: {
        isEditing: false,
        name: "",
        bio: ""
    },
    matches: {
        requestState: requestStates.NOT_MADE,
        requestAttempts: 0,
        matches: null
    },
    otherUsers: {
        // [userId]: {
        //     requestState: requestState.NOT_MADE,
        //     requestAttemtps: 0
        //     user: null
        // }
    },
    header: {
        mainMenuAnchorEl: null,
        userMenuAnchorEl: null
    },
    darkTheme: true,
    errorMessage: null,
    isMobile: false,
    websocket: {
        state: wsStates.DISCONNECTED,
        connectionAttempts: 0
    },
    messages: {
        viewedUser: null,
        userIds: [],
        byUserId: {
            // [userId] : {
            //     messages: [],
            //     displayName: 'john',
            //     imageUrl: '...',
            //     isTyping: false
            // }
        }
    },
    messagedUsers: {
        
    },
    newMessages: {
        // [userId]: [messages]
    },
    
}

//----------------------       SUB-REDUCERS        ----------------------

function mainUser(state = initState.mainUser, action){
    switch (action.type){

        // PATCH MAIN USER    
        case actions.PATCH_USER_INFO_SEND:
            return {
                ...state,
                requestState: requestStates.FETCHING,
                requestAttempts: state.requestAttempts + 1
            }
        case actions.PATCH_USER_INFO_RECEIVE:
            if (action.err) {
                return {
                    ...state,
                    requestState: requestStates.FAILURE
                }
            } else {
                return {
                    ...state,
                    requestState: requestStates.SUCCESS,
                    requestAttempts: 0,
                    user: action.user
                }
            }

        // GET MAIN USER
        case actions.GET_MAIN_USER_SEND:
            return {
                ...state,
                requestState: requestStates.FETCHING,
                requestAttempts: state.requestAttempts + 1
            }
        case actions.GET_MAIN_USER_RECEIVE:
            if (action.err){
                console.log(action.err)
                return {
                    ...state,
                    requestState: requestStates.FAILURE
                } 
            } else {
                return {
                    ...state,
                    requestState: requestStates.SUCCESS,
                    requestAttempts: 0,
                    user: action.user
                }
            }
        default: 
            return state
    }
}

function editInfo(state = initState.editInfo, action){
    switch (action.type){
        case actions.SET_EDIT_INFO:
            return {
                isEditing: action.isEditing === null ? state.isEditing : action.isEditing,
                name: action.name === null ? state.name : action.name,
                bio: action.bio === null ? state.bio : action.bio
            }
        default:
            return state
    }
}

function matches(state = initState.matches, action){
    switch (action.type) {
        case actions.GET_MATCHES_SEND:
            return {
                requestState: requestStates.FETCHING,
                requestAttempts: state.requestAttempts + 1,
                matches: null
            }
        case actions.GET_MATCHES_RECEIVE:
            if (action.err){
                return {
                    ...state,
                    requestState: requestStates.FAILURE
                }
            } else {
                return {
                    requestState: requestStates.SUCCESS,
                    requestAttempts: 0,
                    matches: action.matches
                }
            }
        default:
            return state
    }
}

function otherUsers(state = initState.otherUsers, action){
    switch (action.type) {
        case actions.GET_OTHER_USER_SEND:
            return {
                ...state,
                [action.otherUserId]: {
                    requestState: requestStates.FETCHING,
                    requestAttempts: 1,
                    user: null
                }
            }
        case actions.GET_OTHER_USER_RECEIVE:
            if (action.err) {
                console.log(action.err)
                return {
                    ...state,
                    [action.otherUserId]: {
                        requestState: requestStates.FAILURE,
                        requestAttempts: state[action.otherUserId].requestAttempts,
                        user: null
                    }
                }
            } else {
                return {
                    ...state,
                    [action.otherUserId]: {
                        requestState: requestStates.SUCCESS,
                        requestAttempts: 0,
                        user: action.user
                    }
                }
            }
        default:
            return state
    }
}

function header(state = initState.header, action){
    switch (action.type) {
        case actions.SET_MAIN_MENU:
            return {
                mainMenuAnchorEl: action.anchorEl,
                userMenuAnchorEl: state.userMenu
            }
        case actions.SET_USER_MENU:
            return {
                mainMenuAnchorEl: state.mainMenu,
                userMenuAnchorEl: action.anchorEl
            }
        default:
            return state
    }
}

function darkTheme(state = initState.darkTheme, action){
    if (action.type === actions.SET_THEME) {
        return action.darkTheme
    }
    return state
}

function errorMessage(state = initState.errorMessage, action){
    if (action.type === actions.SET_ERROR_MESSAGE) {
        return action.errorMessage
    }
    return state
}

function isMobile(state = initState.isMobile, action){
    if (action.type === actions.SET_IS_MOBILE) {
        return action.isMobile
    }
    return state
}

function websocket(state = initState.websocket, action){
    switch (action.type){
        case actions.WS_SET_STATE:
            let connectionAttempts = state.connectionAttempts
            if (action.type === wsStates.CONNECTING){
                connectionAttempts += 1
            }
            return {
                state: action.wsState,
                connectionAttempts: connectionAttempts
            }
        default:
            return state
    }
}

function messages(state = initState.messages, action){
    switch (action.type){
        case actions.SET_MESSAGE_INPUT:
            if (state.byUserId[action.userId]){
                return {
                    ...state,
                    byUserId:{
                        ...state.byUserId,
                        [action.userId]: {
                            ...state.byUserId[action.userId],
                            input: action.message
                        }
                    }
                }
            }
            return state
        case actions.WS_RECEIVE_MESSAGES:
            return {
                ...state,
                userIds: action.userIds,
                byUserId: action.byUserId
            }
        case actions.WS_RECEIVE_MESSAGE:
            return state
        default: 
            return state
    }
}

//------------------     APP REDUCER     ------------------

const appReducer = combineReducers({
    mainUser: mainUser,
    editInfo: editInfo,
    matches: matches,
    otherUsers: otherUsers,
    header: header,
    darkTheme: darkTheme,
    errorMessage: errorMessage,
    isMobile: isMobile,
    websocket: websocket,
    messages: messages
})

export default appReducer