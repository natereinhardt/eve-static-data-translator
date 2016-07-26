'use strict';

var async = require("async");
var RequestPromise = require("request-promise");
var Promise = require("bluebird");


var regionModel = require('./../models/universe/regionModel');
var constellationModel = require('./../models/universe/constellationModel');
var systemModel = require('./../models/universe/systemModel');

var eveRegionCrestEndpoint = 'https://crest-tq.eveonline.com/regions';
var eveConstellationCrestEndpoint = 'https://crest-tq.eveonline.com/regions';
var eveRegionmCrestEndpoint = 'https://crest-tq.eveonline.com/regions';


/*
* 1) Call Regions API "https://crest-tq.eveonline.com/regions/{RegionId}
* ---- a) Create Region in DB
* --------i)Iterate Through Constellations
* -----------ii)Create Constellations
* --------------iii)Iterate Through Systems
* -------------------iiii) Create System
*
* */