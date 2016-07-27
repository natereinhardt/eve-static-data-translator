'use strict';

var async = require("async");
var RequestPromise = require("request-promise");
var Promise = require("bluebird");
var _ = require('lodash');


var regionModel = require('./../models/universe/regionModel');
var constellationModel = require('./../models/universe/constellationModel');
var systemModel = require('./../models/universe/systemModel');

var eveRegionCrestEndpoint = 'https://crest-tq.eveonline.com/regions/';
var eveConstellationCrestEndpoint = 'https://crest-tq.eveonline.com/constellations/';
var eveSystemsCrestEndpoint = 'https://crest-tq.eveonline.com/systems/';


/*
* 1) Call Regions API "https://crest-tq.eveonline.com/regions/{RegionId}
* ---- a) Create Region in DB
* --------i)Iterate Through Constellations
* -----------ii)Create Constellations
* --------------iii)Iterate Through Systems
* -------------------iiii) Create System
*
* */

exports.updateUniverseData = getAllRegions;

function getAllRegions(req, res){
    getAllRegionsHrefs().then(function (hrefs){
        var chunks = _.chunk(hrefs, 20);
        return Promise.map(chunks, function(chunk) {
            // tune the delay to what you need it to be
            // it will wait the delay (in ms) before starting the next chunk of requests
            return Promise.map(chunk, getRegion).then(function (getRegionResults){
                console.log('----------------~~~~~~~~~~~~~~~~~~-------------------~~~~~~~~~~~~~~');
                for(var item in getRegionResults){
                    Promise.map(getRegionResults[item].constellations, getConstellationInfo);
                }
            }).delay(200);
        });
    });
}

function getConstellationInfo(whatsComingIN) {
    var options = {
        uri: whatsComingIN.href,
        json: true
    };
    return RequestPromise(options).then(function (responseItem){
        var arrayOfSystems = [];
        for(var system in responseItem.systems){
            var newSystem = new systemModel({
                _id: responseItem.systems[system].id,
                href: responseItem.systems[system].href
            });
            newSystem.save();
            arrayOfSystems.push(newSystem);
        }
        constellationModel.findOne({ _id: whatsComingIN._id }, function (err, doc){
            doc.name = responseItem.name;
            doc.solarSystems = arrayOfSystems;
            doc.save();
        });
    });
}


function getRegion(href) {
    var options = {
        uri: href,
        json: true
    };
    return RequestPromise(options).then(function (responseItem){
        var constellationObjects = [];
        for(var item in responseItem.constellations){
            var newConstellation = constellationModel({
                _id: responseItem.constellations[item].id,
                href: eveConstellationCrestEndpoint + responseItem.constellations[item].id+'/'
            });
            newConstellation.save();
            constellationObjects.push(newConstellation);
        }
        var newRegion = regionModel({
            _id: responseItem.id,
            name: responseItem.name,
            description: responseItem.description,
            href: eveRegionCrestEndpoint + responseItem.id+'/',
            constellations: constellationObjects
        });
        newRegion.save();
        return newRegion;
    });
}

function getAllRegionsHrefs(){
    var options = {
        uri: eveRegionCrestEndpoint,
        json: true
    };
   return RequestPromise(options).then(function (responseItems){
        var regionHrefs = [];
        for(var item in responseItems.items){
                regionHrefs.push(responseItems.items[item].href);
        }
        return regionHrefs;
    });
}

