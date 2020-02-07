import { actions, wsSetState } from './actions'
import { wsStates } from './reducers'
import Config from '../config'
import {dataTypes, sendPacket, receivePacket} from '../utils/wsHelpers'

let ws = null

const websocketMiddleware = () => {

  const onOpen = store => event => {
    console.log('Websocket Opened')
    store.dispatch(wsSetState(wsStates.CONNECTED))
  }
  const onClose = store => event => {
    console.log('Websocket Closed', event)
    store.dispatch(wsSetState(wsStates.DISCONNECTED))
  }
  const onError = store => event => {
    console.log('Websocket Error', event)
  }
  const onMessage = store => event => {
    receivePacket(event.data, store.dispatch)
  }

  return store => next => action => {

    switch(action.type){

      case actions.WS_CONNECT:
        const wsData = store.getState().websocket
        if (wsData.state === wsStates.DISCONNECTED && wsData.connectionAttempts < 1){
          store.dispatch(wsSetState(wsStates.CONNECTING))
          ws = new WebSocket(Config.wsServerUrl)
          ws.onopen = onOpen(store)
          ws.onmessage = onMessage(store)
          ws.onclose = onClose(store)
          ws.onerror = onError(store)
        }
        break;
      
      case actions.WS_DISCONNECT:
        store.dispatch(wsSetState(wsStates.DISCONNECTING))
        break;
      case actions.WS_SEND_MESSAGE:
        sendPacket(ws, action.packetType, action.data)
        break;
      default: break;
    }
    return next(action)
  }
}

export default websocketMiddleware


//----------     possible future use     ---------

function heartbeat(ws) {
  console.log('ping received')
  clearTimeout(ws.pingTimeout)

  ws.pingTimeout = setTimeout(() => {
    ws.close(1000, "Server didn't send heartbeat in last 31 seconds")
  }, 30000 + 1000)
}