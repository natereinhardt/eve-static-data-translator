var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema Definition
var shipSchema = new Schema({
    eveId: Number,
    name: String,
    shipType: Number,
    imgUrlLrg: String,
    imgUrlSml: String,
    renderUrl: String
});

//Expose (export) the model
module.exports = mongoose.model('Ship', shipSchema);