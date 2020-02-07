const { DataSource } = require('apollo-datasource');
//Custom

class TestAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async getBob(){
    return 'Bob here. Howareya?'
  }

  async getFood({ type }){
    return `Here is your order of ${type}.`
  }

  async getPie(){
    return askForPie()
  }

  async getPizza({ type }){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        switch(type){
          case "cheese":
            resolve("Here is your cheese Pizza. Its ok")
          case "pepperoni":
            resolve("here is your pepperoni pizza. It's delicious!")
          default: 
            reject(`We don't have ${type} pizza. Sorry \_O_O_/`)
        }
      },1000)
    })
  }
}

function askForPie(){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      if (Math.random() < 0.5){
        resolve("Here's your delicious pie!!!")
      } else {
        reject("Looks like we're fresh out of that one...")
      }
    }, 1000)
  })
}
    
module.exports = TestAPI;