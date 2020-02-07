

const dataTypes = {
  EXISTING_MESSAGES: 'EXISTING_MESSAGES',
  NEW_MESSAGE: 'NEW_MESSAGE',
  TYPING: 'TYPING',
}

function sendPacket(ws, type, data){
  let packet = {
    type: type,
    data: data
  }
  ws.send(JSON.stringify(packet))
}

function receivePacket(packet, dispatch){
  packet = JSON.parse(packet)
  if (packet.type){
    data = packet.data
    switch(packet.type){
      case dataTypes.EXISTING_MESSAGES:
        dispatch.
        return;
      default: 
        console.log('Unexpected Websocket packet type:', data.type)
    }
  } else {
    console.log("Websocket packet sent without a type. Did you mean to do that?");
    console.log(packet);
  }
}


module.exports = {dataTypes, sendPacket, receivePacket}