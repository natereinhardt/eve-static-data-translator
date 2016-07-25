var eveCrestCtrl = require('./../controllers/eveCrestCtrl');

var eveCrestApi = '/api/eveCrest/';

module.exports = function (app) {


    //Get ships from Eve's Crest Api
    // app.route(eveCrestApi + 'ships').get(eveCrestCtrl.getShips);

    // Builds Eve's Universe from a collection of from Eve's Crest Api
    // app.route(eveCrestApi + 'universe').get(eveCrestCtrl.getUniverse);

    //Get items from Eve's Crest Api
    app.route(eveCrestApi + 'item').get(eveCrestCtrl.getItemData);


};