var RequestPromise = require("request-promise");
var Promise = require("bluebird");

var regionModel = require('./../models/universe/regionModel');
var constellationModel = require('./../models/universe/constellationModel');
var systemModel = require('./../models/universe/systemModel');

var eveRegionCrestEndpoint = 'https://crest-tq.eveonline.com/regions/';
var eveConstellationCrestEndpoint = 'https://crest-tq.eveonline.com/constellations/';

exports.updateUniverseData = buildUniverse;

/**
 * WARNING! buildUniverse TAKES OVER AND HOUR TO RUN (last run 1 hour 7 mins).
 *
 * buildUniverse should build a universe of:
 * 100 Regions
 * 1120 Constellations
 * 8035 Solar Systems
 *
 *
 * **/

function buildUniverse(req, res) {
    getAllRegionsHrefs().then(function (hrefs) {
        return Promise.mapSeries(hrefs, function (href) {
            return getRegion(href).then(function (constellations) {
                return Promise.mapSeries(constellations, function (constellation) {
                    return getConstellationInfo(constellation).then(function (system) {
                        return Promise.map(system, getSystem).delay(2500);
                    });
                });
            });
        });
    });
}

function getSystem(system) {
    var options = {
        uri: system.href,
        json: true
    };
    return RequestPromise(options).then(function (responseItem) {
        //Grab the system in the db and update it with its info
        var securityType;
        if (responseItem.securityStatus <= (-0.990000009536743)) {
            //J-Space
            securityType = 'J'
        } else {
            //K-Space
            securityType = 'K';
        }
        var newSystem = new systemModel({
            _id: responseItem.id,
            securityClass: responseItem.securityClass,
            href: responseItem.href,
            securityStatus: responseItem.securityStatus,
            position :{
                x: responseItem.position.x,
                y: responseItem.position.y,
                z: responseItem.position.z
            },
            name: responseItem.name,
            systemType: securityType,
            constellationId: responseItem.constellation.id
        });
        newSystem.save();
    }).catch(function (err){
        console.log("Updating System Encountered an Error: ", err);
    })
}

function getConstellationInfo(constellation) {
    var options = {
        uri: constellation.href,
        json: true
    };
    return RequestPromise(options).then(function (responseItem) {
        var arrayOfSystemsHrefs = [];
        var arrayOfSystemsIds = [];
        for (var system in responseItem.systems) {
            if (responseItem.systems.hasOwnProperty(system)) {
                arrayOfSystemsHrefs.push(responseItem.systems[system].href);
                arrayOfSystemsIds.push(responseItem.systems[system].id);
            }
        }
        var newConstellation = new constellationModel({
            _id: constellation.id,
            name: responseItem.name,
            href: constellation.href,
            solarSystemIds: arrayOfSystemsIds,
            position :{
                x: responseItem.position.x,
                y: responseItem.position.y,
                z: responseItem.position.z
            }
        });
        newConstellation.save();
        return responseItem.systems;
    }).catch(function (err){
        console.log("Getting Constellation Info Encountered an Error: ", err);
    });
}

function getRegion(href) {
    var options = {
        uri: href,
        json: true
    };
    return RequestPromise(options).then(function (responseItem) {
        var constellationIds = [];

        for (var item in responseItem.constellations) {
            constellationIds.push(responseItem.constellations[item].id );
        }
        var newRegion = regionModel({
            _id: responseItem.id,
            name: responseItem.name,
            description: responseItem.description,
            href: eveRegionCrestEndpoint + responseItem.id + '/',
            constellationIds: constellationIds
        });
        newRegion.save();
        return responseItem.constellations;
    }).catch(function (err){
        console.log("Getting Region Encountered an Error: ", err);
    });
}

function getAllRegionsHrefs() {
    var options = {
        uri: eveRegionCrestEndpoint,
        json: true
    };
    return RequestPromise(options).then(function (responseItems) {
        var regionHrefs = [];
        for (var item in responseItems.items) {
            if (responseItems.items.hasOwnProperty(item)) {
                regionHrefs.push(responseItems.items[item].href);
            }
        }
        return regionHrefs;
    }).catch(function (err){
        console.log("Getting Region HREFS Encountered an Error: ", err);
    });
}