var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

//Schema Definition
var regionSchema = new Schema({
    _id: Number,
    name: String,
    description: String,
    href: String,
    constellationIds: [Number]//Reference
});

//Expose (export) the model
module.exports = mongoose.model('Region', regionSchema);