var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema Definition
var solarSystemSchema = new Schema({
    _id: Number,
    name: String,
    href: String,
    securityStatus: Number,
    systemType: Number
});

//Expose (export) the model
module.exports = mongoose.model('SolarSystem', solarSystemSchema);