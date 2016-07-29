var RequestPromise = require("request-promise");
var Promise = require("bluebird");

var regionModel = require('./../models/universe/regionModel');
var constellationModel = require('./../models/universe/constellationModel');
var systemModel = require('./../models/universe/systemModel');

var eveRegionCrestEndpoint = 'https://crest-tq.eveonline.com/regions/';
var eveConstellationCrestEndpoint = 'https://crest-tq.eveonline.com/constellations/';

exports.updateUniverseData = buildUniverse;
/**
 * WARNING! buildUniverse TAKES OVER AND HOUR TO RUN.
 *
 * buildUniverse should build a univers of:
 * 100 Regions
 * 1120 Constellations
 * 8035 Solar Systems
 *
 *
 * **/
function buildUniverse(req, res) {
    getAllRegionsHrefs().then(function (hrefs) {
        return Promise.mapSeries(hrefs, function (href) {
            return getRegion(href).then(function (regions) {
                return Promise.mapSeries(regions.constellations, function (constellation) {
                    return getConstellationInfo(constellation).then(function (constellationInfo) {
                        return Promise.map(constellationInfo, getSystem).delay(2000);
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
            securityType = 2
        } else {
            //K-Space
            securityType = 1;
        }
        systemModel.findOne({_id: system._id}, function (err, doc) {
            doc.name = responseItem.name;
            doc.securityStatus = responseItem.securityStatus;
            doc.systemType = securityType;
            doc.save();
            console.log("Updated System in Database: ", doc)
        });
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
        var arrayOfSystems = [];
        for (var system in responseItem.systems) {
            if (responseItem.systems.hasOwnProperty(system)) {
                var newSystem = new systemModel({
                    _id: responseItem.systems[system].id,
                    href: responseItem.systems[system].href
                });
                newSystem.save();
                arrayOfSystems.push(newSystem);
            }
        }
        //find the constellation and update it with its info
        constellationModel.findOne({_id: constellation._id}, function (err, doc) {
            doc.name = responseItem.name;
            doc.solarSystems = arrayOfSystems;
            doc.save();
        });
        return arrayOfSystems;
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
        var constellationObjects = [];
        for (var item in responseItem.constellations) {
            var newConstellation = constellationModel({
                _id: responseItem.constellations[item].id,
                href: eveConstellationCrestEndpoint + responseItem.constellations[item].id + '/'
            });
            newConstellation.save();
            constellationObjects.push(newConstellation);
        }
        var newRegion = regionModel({
            _id: responseItem.id,
            name: responseItem.name,
            description: responseItem.description,
            href: eveRegionCrestEndpoint + responseItem.id + '/',
            constellations: constellationObjects
        });
        newRegion.save();
        return newRegion;
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