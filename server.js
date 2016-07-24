const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const  methodOverride = require('method-override');


const models_path = join(__dirname, 'src/models');
const universe_path = join(__dirname, 'src/models/Universe');

const port = process.env.PORT || 12345;
const app = express();

mongoose.connect('mongodb://localhost:27017/eos');


//Grab all models
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(models_path + '/' + file)
    }
});

//Grab all models related to building the univers
fs.readdirSync(universe_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(universe_path + '/' + file)
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


require('./src/routes/itemsRoutes')(app);


app.listen(port);
console.log('SERVER IS RUNNING ON PORT: ('+ port +')');
exports = module.exports = app;
