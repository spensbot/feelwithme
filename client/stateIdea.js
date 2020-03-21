//A Normalized Data graph.
const data = {
  //Specifies a type of object that can be retrieved
  type1: {
    //A dictionary of retrieved objects with their unique ID as the key
    byId: {
      
    },
    //Specifies how this type of object with a given ID can be retrieved
    query: (idArray, paramArray) => {

    },
    //Specifies how this type of object with a given ID can be mutated
    mutate: (idArray, paramArray) => {

    }
  }
}

//A state which consists of object ids, but no data
const state = {
  me: {
    //value: undefined
    query: () => {
      
    }
  },

}

const stateMap = {
  user: {
    byId: {

    },
    query: (idArray, params) => {
      
    },
    mutate: (idArray, params) => {
      
    }
  },

  artist: {
    byId: {

    },
    query: (idArray, params) => {

    }
  }
}

const getState = stateRequest => {

  let loading
  let error
  let data

  for (let [key, value] of Object.entries(stateRequest)) {
    stateMap[key]
  }

  return {
    loading,
    error,
    data
  }

}






























const projectStateExample = {
  artists: {
    byId: {}
  },
  songs: {
    byId: {}
  },
  users: {

  },
  messages: {

  },
  matches: {

  }
}