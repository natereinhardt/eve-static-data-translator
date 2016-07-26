'use strict';

var async = require("async");
var RequestPromise = require("request-promise");
var Promise = require("bluebird");


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
       for(var href in hrefs){
           var options = {
               uri: hrefs[href],
               json: true
           };
           
           RequestPromise(options).then(function (responseItem){
               var constellationObjects = [];
               for(var item in responseItem.constellations){
                   var newConstellation = constellationModel({
                       _id: responseItem.constellations[item].id,
                       href: 'https://crest-tq.eveonline.com/constellations/'+responseItem.constellations[item].id+'/'
                   });
                   newConstellation.save();
                   constellationObjects.push(newConstellation);
               }
               var newRegion = regionModel({
                   _id: responseItem.id,
                   name: responseItem.name,
                   description: responseItem.description,
                   href: 'https://crest-tq.eveonline.com/regions/'+responseItem.id+'/',
                   constellations: constellationObjects
               });
                newRegion.save();
                console.log(newRegion);
           });
       }
   });
}


function getAllRegionsHrefs(){
    var options = {
        uri: eveRegionCrestEndpoint,
        json: true
    };
   return RequestPromise(options).then(function (responseItems){
        //console.log(responseItems);
        var regionHrefs = [];
        for(var item in responseItems.items){
                regionHrefs.push(responseItems.items[item].href);
        }
        return regionHrefs;
    });
}