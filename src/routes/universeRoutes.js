var universeCtrl = require('./../controllers/universeCtrl');

var universeApi = '/api/universe/';


module.exports = function(app) {

     app.route(universeApi + 'updateUniverseData').get(universeCtrl.updateUniverseData);
    // app.route(universeApi + 'getAllConts').get(universeCtrl.getAllConstellatons);

};