'use strict';

var async = require("async");
var RequestPromise = require("request-promise");
var Promise = require("bluebird");
var shipModel = require('./../models/shipModel');


var eveItemCrestEndpoint = 'https://crest-tq.eveonline.com/inventory/types/';
/**
 * NOTE: Build imageUrls
 *
 * 1) imgUrlSml: https://imageserver.eveonline.com/Type/{typeId}_32.png
 * 2) imgUrlLrg: https://imageserver.eveonline.com/Type/{typeId}_62.png
 * 3) renderUrl: https://imageserver.eveonline.com/Render/{typeID}_256.png
 *
 *
 * */

/**Mining Barges: 1 **/
var miningBargeIds = [
    '17476',  // Covetor
    '17478',  // Retriever
    '17480'   // Procurer
];
/**Exhumers: 2 **/
var exhumerIds = [
    '22548',  //Mackinaw
    '22546',  // Skiff
    '22544'   // Hulk
];
/**Mining Frigates: 3 **/
var miningFrigateIds = [
    '32880',  // Venture
    '33697',  //Prospect
    '353428'  // Endurance
];
/**Industrial Command Ships: 4 **/
var industrialCommandShipIds = [
    '28606',  //Orca
    '28352'   //Rorqual
];
/**Haulers: 5 **/
var haulerShipIds = [
    //~AMARR
    '1944',     //Bestower
    '19744',    //Sigil
    '12733',    //Prorator
    '12753',    //Impel
    '20183',    //Providence
    '28850',    //Ark
    //~CALDARI
    '648',      //Badger
    '649',      //Tayra
    '12729',    //Crane
    '12731',    //Bustard
    '20185',    //Charon
    '28844',    //Rhea
    //~GALLENTE
    '650',      //Nereus
    '654',      //Kryos
    '655',      //Epithal
    '656',      //Miasmos
    '657',      //Iteron Mark V
    '12743',    //Viator
    '12745',    //Occator
    '20187',    //Obelisk
    '28848',    //Anshar
    //~MINMATA
    '651',      //Hoarder
    '652',      //Mammoth
    '653',      //Wreathe
    '12735',    //Prowler
    '12747',    //Mastodon
    '20189',    //Fenrir
    '28846'     //Nomad
];

exports.updateBargeData = function updateBargeData(req, res) {
    var shipType = 1;
    getShipData(miningBargeIds, shipType).then(function (retrievedShips){
        res.json(retrievedShips);
    }).catch(function (err){
        console.log('An Error Occurred: ', err)
    });
};

exports.updateExhumerData = function updateExhumerData(req, res) {
    var shipType = 2;
    getShipData(exhumerIds, shipType).then(function (retrievedShips){
        res.json(retrievedShips);
    }).catch(function (err){
        console.log('An Error Occurred: ', err)
    });
};

exports.updateFrigateData = function updateFrigateData(req, res) {
    var shipType = 3;
    getShipData(miningFrigateIds, shipType).then(function (retrievedShips){
        res.json(retrievedShips);
    }).catch(function (err){
        console.log('An Error Occurred: ', err)
    })
};

exports.updateCommandShipData = function updateCommandShipData(req, res) {
    var shipType = 4;
    getShipData(industrialCommandShipIds, shipType).then(function (retrievedShips){
        res.json(retrievedShips);
    }).catch(function (err){
        console.log('An Error Occurred: ', err)
    })
};

exports.updateHaulerData = function updateHaulerData(req, res) {
    var shipType = 5;
    getShipData(haulerShipIds, shipType).then(function (retrievedShips){
        res.json(retrievedShips);
    }).catch(function (err){
        console.log('An Error Occurred: ', err)
    })
};

function getShipData(shipIds, shipType){
    var ships = [];
    var allPromises = [];
    for (var id in shipIds) {
        if(shipIds.hasOwnProperty(id)){
            var options = {

                uri: eveItemCrestEndpoint + shipIds[id] + '/',
                json: true
            };
            allPromises.push(RequestPromise(options));
        }
    }
    return Promise.all(allPromises).then(function (responseItems) {
        for (var item in responseItems) {
            if(responseItems.hasOwnProperty(item)){
                var newShip = new shipModel({
                    _id: responseItems[item].id,
                    name: responseItems[item].name,
                    description: responseItems[item].description,
                    itemType: shipType,
                    imgUrlLrg: 'https://imageserver.eveonline.com/Type/' + responseItems[item].id + '_64.png',
                    imgUrlSml: 'https://imageserver.eveonline.com/Type/' + responseItems[item].id + '_32.png',
                    renderUrl: 'https://imageserver.eveonline.com/Render/' + responseItems[item].id + '_256.png'
                });
                newShip.save();
                ships.push(newShip);

            }
        }
        return ships;
    }).catch(function (err) {
        console.log(err);
    });
}


