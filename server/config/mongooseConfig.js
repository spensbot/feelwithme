var mongoose = require('mongoose');
var vars = require('../config/vars');

mongoose.set('useCreateIndex', true);

mongoose.connect(vars.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connection Successful")
});