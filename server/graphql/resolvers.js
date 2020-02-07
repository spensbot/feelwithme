module.exports = {
  Query: {
    test: (_, __, {}) => 'Successful Test!',
    me: (_, __, {dataSources}) => dataSources.fwmAPI.getActiveUser(),
    otherUser: (_, {id}, {dataSources}) => dataSources.fwmAPI.getUser({id: id}),
    



    // hello: (_, __, {dataSources}) => 'Hello world!',
    // bob: (_, __, {dataSources}) => 
    //   dataSources.testAPI.getBob(),
    // food: (_, {type}, {dataSources}) => 
    //   dataSources.testAPI.getFood({type: type}),
    // pie: (_, __, {dataSources}) => 
    //   dataSources.testAPI.getPie(),
    // pizza: (_, {type}, {dataSources}) =>
    //   dataSources.testAPI.getPizza({type: type}),
  },
};