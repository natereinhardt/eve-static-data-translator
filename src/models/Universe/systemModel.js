var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema Definition
var solarSystemSchema = new Schema({
    _id: Number,
    securityClass: String,
    href: String,
    securityStatus: Number,
    position :{
        x: Number,
        y: Number,
        z: Number
    },
    name: String,
    systemType: String,
    constellationId: Number
});

//Expose (export) the model
module.exports = mongoose.model('SolarSystem', solarSystemSchema);