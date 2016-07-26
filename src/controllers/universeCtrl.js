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
       var constellationHrefs = [];
       for(var href in hrefs){

           var options = {
               uri: hrefs[href],
               json: true
           };

           RequestPromise(options).then(function (responseItem){
               for(var item in responseItem.constellations){
                   constellationHrefs.push(responseItem.constellations[item].href);
               }
               console.log('Constellations for ' + responseItem.name + ' : ', constellationHrefs);
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