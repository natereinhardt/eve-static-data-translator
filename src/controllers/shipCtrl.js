'use strict';

var async = require("async");
var RequestPromise = require("request-promise");
var Promise = require("bluebird");
var shipModel = require('./../models/shipModel');


var eveItemCrestEndpoint = 'https://crest-tq.eveonline.com/inventory/types/';

/**
 1 - Mining Barge

 17476       Covetor
 17478       Retriever
 17480       Procurer

 2 - Exhumer

 22548       Mackinaw
 22546       Skiff
 22544       Hulk

 3 - Mining Frigate

 32880       Venture
 33697       Prospect
 353428      Endurance

 4 - Industrial Command Ship

 28606       Orca
 28352       Rorqual

 5 - Hauler

 ~AMAR
 1944        Bestower
 19744       Sigil
 12733       Prorator
 12753       Impel
 20183       Providence
 28850       Ark
 ~CALDARI
 648         Badger
 649         Tayra
 12729       Crane
 12731       Bustard
 20185       Charon
 28844       Rhea
 ~GALLENTE
 650         Nereus
 654         Kryos
 655         Epithal
 656         Miasmos
 657         Iteron Mark V
 12743       Viator
 12745       Occator
 20187       Obelisk
 28848       Anshar

 ~MINMATAR
 651         Hoarder
 652         Mammoth
 653         Wreathe
 12735       Prowler
 12747       Mastodon
 20189       Fenrir
 28846       Nomad



 ships = [<item id of mining/hauling ships>]
 * 1) Call Item Types "https://crest-tq.eveonline.com/inventory/types/{shipIds}
 * ---- a) Create Ship in DB
 *          i) Set ship type (Number 1-3)
 *          1 - Mining Barge
 *          2 - Exhumer
 *          3 - Mining Frigate
 *          4 - Industrial Command Ship
 *          5 - Hauler
 *
 *
 * NOTE: Build imageUrls
 *
 * 1) imgUrlSml: https://imageserver.eveonline.com/Type/{typeId}_32.png
 * 2) imgUrlLrg: https://imageserver.eveonline.com/Type/{typeId}_62.png
 * 3) renderUrl: https://imageserver.eveonline.com/Render/{typeID}_256.png
 *
 *
 * */
var miningBargeIds = [
    '17476',  // Covetor
    '17478',  // Retriever
    '17480'   // Procurer
];

var exhumerIds = [
    '22548',  //Mackinaw
    '22546',  // Skiff
    '22544'   // Hulk
];

var miningFrigateIds = [
    '32880',  // Venture
    '33697',  //Prospect
    '353428'  // Endurance
];

var industrialCommandShipIds = [
    '28606',  //Orca
    '28352'   //Rorqual
];

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
    var ships = [];
    var allPromises = [];
    for(var miningBargeId in miningBargeIds) {
        var options = {
            uri: eveItemCrestEndpoint + miningBargeIds[miningBargeId] +'/',
            json: true
        };
        allPromises.push(RequestPromise(options));
    }
    Promise.all(allPromises).then(function (responseItems){
        for(var item in responseItems){
            var newShip = new shipModel({
                _id : responseItems[item].id,
                name: responseItems[item].name,
                description: responseItems[item].description,
                itemType: 1,
                imgUrlLrg: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_64.png',
                imgUrlSml: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_32.png',
                renderUrl: 'https://imageserver.eveonline.com/Render/'+responseItems[item].id+'_256.png'
            });
            newShip.save();
            ships.push(newShip);
        }
        res.json(ships);
    }).catch(function(err){
        console.log(err);
    });
};

exports.updateExhumerData = function updateExhumerData(req, res) {
    var ships = [];
    var allPromises = [];
    for(var exhumerId in exhumerIds) {
        var options = {
            uri: eveItemCrestEndpoint + exhumerIds[exhumerId] +'/',
            json: true
        };
        allPromises.push(RequestPromise(options));
    }
    Promise.all(allPromises).then(function (responseItems){
        for(var item in responseItems){
            var newShip = new shipModel({
                _id : responseItems[item].id,
                name: responseItems[item].name,
                description: responseItems[item].description,
                itemType: 2,
                imgUrlLrg: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_64.png',
                imgUrlSml: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_32.png',
                renderUrl: 'https://imageserver.eveonline.com/Render/'+responseItems[item].id+'_256.png'
            });
            newShip.save();
            ships.push(newShip);
        }
        res.json(ships);
    }).catch(function(err){
        console.log(err);
    });
};

exports.updateFrigateData = function updateFrigateData(req, res) {
    var ships = [];
    var allPromises = [];
    for(var miningFrigateId in miningFrigateIds) {
        var options = {
            uri: eveItemCrestEndpoint + miningFrigateIds[miningFrigateId] +'/',
            json: true
        };
        allPromises.push(RequestPromise(options));
    }
    Promise.all(allPromises).then(function (responseItems){
        for(var item in responseItems){
            var newShip = new shipModel({
                _id : responseItems[item].id,
                name: responseItems[item].name,
                description: responseItems[item].description,
                itemType: 3,
                imgUrlLrg: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_64.png',
                imgUrlSml: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_32.png',
                renderUrl: 'https://imageserver.eveonline.com/Render/'+responseItems[item].id+'_256.png'
            });
            newShip.save();
            ships.push(newShip);
        }
        res.json(ships);
    }).catch(function(err){
        console.log(err);
    });
};

exports.updateCommandShipData = function updateCommandShipData(req, res) {
    var ships = [];
    var allPromises = [];
    for(var industrialCommandShipId in industrialCommandShipIds) {
        var options = {
            uri: eveItemCrestEndpoint + industrialCommandShipIds[industrialCommandShipId] +'/',
            json: true
        };
        allPromises.push(RequestPromise(options));
    }
    Promise.all(allPromises).then(function (responseItems){
        for(var item in responseItems){
            var newShip = new shipModel({
                _id : responseItems[item].id,
                name: responseItems[item].name,
                description: responseItems[item].description,
                itemType: 4,
                imgUrlLrg: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_64.png',
                imgUrlSml: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_32.png',
                renderUrl: 'https://imageserver.eveonline.com/Render/'+responseItems[item].id+'_256.png'
            });
            newShip.save();
            ships.push(newShip);
        }
        res.json(ships);
    }).catch(function(err){
        console.log(err);
    });
};


exports.updateHaulerData = function updateHaulerData(req, res) {
    var ships = [];
    var allPromises = [];
    for(var haulerShipId in haulerShipIds) {
        var options = {
            uri: eveItemCrestEndpoint + haulerShipIds[haulerShipId] +'/',
            json: true
        };
        allPromises.push(RequestPromise(options));
    }
    Promise.all(allPromises).then(function (responseItems){
        for(var item in responseItems){
            var newShip = new shipModel({
                _id : responseItems[item].id,
                name: responseItems[item].name,
                description: responseItems[item].description,
                itemType: 5,
                imgUrlLrg: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_64.png',
                imgUrlSml: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_32.png',
                renderUrl: 'https://imageserver.eveonline.com/Render/'+responseItems[item].id+'_256.png'
            });
            newShip.save();
            ships.push(newShip);
        }
        res.json(ships);
    }).catch(function(err){
        console.log(err);
    });
};


