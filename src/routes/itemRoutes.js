var itemCtrl = require('./../controllers/itemCtrl');
var itemApi = '/api/item/';

module.exports = function(app) {

    //Calls CREST to pull ORE data and adds it to the db if it is not there
    app.route(itemApi + 'updateOreData').get(itemCtrl.updateOreData);
    //Calls CREST to pull ICE data and adds it to the db if it is not there
    app.route(itemApi + 'updateIceData').get(itemCtrl.updateIceData);

};