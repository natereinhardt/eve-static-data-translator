var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema Definition
var constellationSchema = new Schema({
    _id: Number,
    name: String,
    href: String,
    solarSystemIds: [Number],
    position :{
        x: Number,
        y: Number,
        z: Number
    }
});

//Expose (export) the model
module.exports = mongoose.model('Constellation', constellationSchema);