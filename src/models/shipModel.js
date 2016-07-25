var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema Definition
var shipSchema = new Schema({
    _id: Number,
    name: String,
    description: String,
    shipType: Number,
    imgUrlLrg: String,
    imgUrlSml: String,
    renderUrl: String
});

//Expose (export) the model
module.exports = mongoose.model('Ship', shipSchema);