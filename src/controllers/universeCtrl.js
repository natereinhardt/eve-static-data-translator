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
        var chunks = _.chunk(hrefs, 25);
        return Promise.map(chunks, function(chunk) {
            return Promise.map(chunk, getRegion).then(function (getRegionResults){
                for(var item in getRegionResults) {
                    Promise.map(getRegionResults[item].constellations, getConstellationInfo).then(function (constellationInfo) {
                        var chunks = _.chunk(constellationInfo, 150);
                        return Promise.map(chunks, function (chunk) {
                            return Promise.map(chunk, getSystem).delay(20000);
                        })
                    }).delay(20000);
                }
            }).delay(200000);
        });
    });
}

function getSystem(systems){
    for(var updateSystem in systems){
        var options = {
            uri: systems[updateSystem].href,
            json: true
        };
         RequestPromise(options).then(function (responseItem){
             //Grab the system in the db and update it with its info
            systemModel.findOne({ _id: systems[updateSystem]._id }, function (err, doc){
                doc.name = responseItem.name;
                doc.save();
            });

        });
    }
}

function getConstellationInfo(constellation) {
    var options = {
        uri: constellation.href,
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
        //find the constellation and update it with its info
        constellationModel.findOne({ _id: constellation._id }, function (err, doc){
            doc.name = responseItem.name;
            doc.solarSystems = arrayOfSystems;
            doc.save();
        });
        return arrayOfSystems;
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

