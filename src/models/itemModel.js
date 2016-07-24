var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema Definition
var itemSchema = new Schema({
    _id : Number,
    name: String,
    description: String,
    itemType: Number,
    volume: Number,
    imgUrlLrg: String,
    imgUrlSml: String
});

//Expose (export) the model
module.exports = mongoose.model('Item', itemSchema);