import React from 'react'
import {connect} from 'react-redux'
import Config from '../config'

function WebSocket(props) {

  const ws = new WebSocket(Config.wsServerUrl)

  ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected')
  }

  ws.onmessage = evt => {
    // listen to data sent from the websocket server
    const message = JSON.parse(evt.data)
    this.setState({ dataFromServer: message })
    console.log(message)
  }

  ws.onclose = () => {
    console.log('disconnected')
    // automatically try to reconnect on connection loss
  }

  return (
    <>
      {this.props.children()}
    </>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebSocket)