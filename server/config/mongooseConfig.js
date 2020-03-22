var mongoose = require('mongoose');
var config = require('../config');

console.log(config)

mongoose.set('useCreateIndex', true);

mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connection Successful")
});