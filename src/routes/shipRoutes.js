var shipCtrl = require('./../controllers/shipCtrl');

var shipApi = '/api/ship/';


module.exports = function(app) {

    //Calls CREST to pull BARGE data and adds it to the db if it is not there
    app.route(shipApi + 'updateBargeData').get(shipCtrl.updateBargeData);
    //Calls CREST to pull EXHUMER data and adds it to the db if it is not there
    app.route(shipApi + 'updateExhumerData').get(shipCtrl.updateExhumerData);
    //Calls CREST to pull FRIGATE data and adds it to the db if it is not there
    app.route(shipApi + 'updateFrigateData').get(shipCtrl.updateFrigateData);
    //Calls CREST to pull COMMAND SHIP data and adds it to the db if it is not there
    app.route(shipApi + 'updateCommandShipData').get(shipCtrl.updateCommandShipData);
    //Calls CREST to pull Hauler data and adds it to the db if it is not there
    app.route(shipApi + 'updateHaulerData').get(shipCtrl.updateHaulerData);


};