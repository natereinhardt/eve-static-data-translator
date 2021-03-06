const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const  methodOverride = require('method-override');

const routes = join(__dirname, 'src/routes');

const port = process.env.PORT || 12345;
const app = express();

mongoose.connect('mongodb://localhost:27017/eos');


//Grab all the routes
fs.readdirSync(routes).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(routes + '/' + file)(app)
    }
});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use('/node_modules', express.static(__dirname +'/node_modules'));


app.listen(port);
console.log('SERVER IS RUNNING ON PORT: ('+ port +')');
exports = module.exports = app;

