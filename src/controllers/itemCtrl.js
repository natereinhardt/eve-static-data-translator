'use strict';

var async = require("async");
var RequestPromise = require("request-promise");
var Promise = require("bluebird");
var itemModel = require('./../models/itemModel');


var eveItemCrestEndpoint = 'https://crest-tq.eveonline.com/inventory/types/';

/**
 *
 ****ORE****
 *itemType: 1
 22          Arkonor
 17425       Crimson Arkonor
 17426       Prime Arkonor
 1223        Bistot
 17428       Triclinic Bistot
 17429       Monoclinic Bistot
 1225        Crokite
 17432       Sharp Crokite
 17433       Crystalline Crokite
 1232        Dark Ochre
 17436       Onyx Ochre
 17437       Obsidian Ochre
 21          Hedbergite
 17440       Vitric Hedbergite
 17441       Glazed Hedbergite
 1231        Hemorphite
 17444       Vivid Hemorphite
 17445       Radiant Hemorphite
 1226        Jaspet
 17448       Pure Jaspet
 17449       Pristine Jaspet
 20          Kernite
 17452       Luminous Kernite
 17453       Fiery Kernite
 18          Plagioclase
 17455       Azure Plagioclase
 17456       Rich Plagioclase
 1224        Pyroxeres
 17459       Solid Pyroxeres
 17460       Viscous Pyroxeres
 1228        Scordite
 17463       Condensed Scordite
 17464       Massive Scordite
 19          Spodumain
 17466       Bright Spodumain
 17467       Gleaming Spodumain
 1230        Veldspar
 17470       Concentrated Veldspar
 17471       Dense Veldspar
 1229        Gneiss
 17865       Iridescent Gneiss
 17866       Prismatic Gneiss
 11396       Mercoxit
 17869       Magma Mercoxit
 17870       Vitreous Mercoxit
 1227        Omber
 17867       Silvery Omber
 17868       Golden Omber
 *
 *
 *
 * ****ICE****
 *itemType: 2
 16262       Clear Icicle
 17978       Enriched Clear Icicle
 16263       Glacial Mass
 17977       Smooth Glacial Mass
 16264       Blue Ice
 17975       Thick Blue Ice
 16265       White Glaze
 17976       Pristine White Glaze
 16266       Glare Crust
 16267       Dark Glitter
 *
 */

var oreIds = [
    //ORE
    '22' ,    // Arkonor
    '17425',  // Crimson Arkonor
    '17426',  // Prime Arkonor
    '1223',   // Bistot
    '17428',  // Triclinic Bistot
    '17429',  // Monoclinic Bistot
    '1225',   // Crokite
    '17432',  // Sharp Crokite
    '17433',  // Crystalline Crokite
    '1232',   // Dark Ochre
    '17436',  // Onyx Ochre
    '17437',  // Obsidian Ochre
    '21',     // Hedbergite
    '17440',  // Vitric Hedbergite
    '17441',  // Glazed Hedbergite
    '1231',   // Hemorphite
    '17444',  // Vivid Hemorphite
    '17445',  // Radiant Hemorphite
    '1226',   // Jaspet
    '17448',  // Pure Jaspet
    '17449',  // Pristine Jaspet
    '20',     // Kernite
    '17452',  // Luminous Kernite
    '17453',  // Fiery Kernite
    '18',     // Plagioclase
    '17455',  // Azure Plagioclase
    '17456',  // Rich Plagioclase
    '1224',   // Pyroxeres
    '17459',  // Solid Pyroxeres
    '17460',  // Viscous Pyroxeres
    '1228',   // Scordite
    '17463',  // Condensed Scordite
    '17464',  // Massive Scordite
    '19',     // Spodumain
    '17466',  // Bright Spodumain
    '17467',  // Gleaming Spodumain
    '1230',   // Veldspar
    '17470',  // Concentrated Veldspar
    '17471',  // Dense Veldspar
    '1229',   // Gneiss
    '17865',  // Iridescent Gneiss
    '17866',  // Prismatic Gneiss
    '11396',  // Mercoxit
    '17869',  // Magma Mercoxit
    '17870',  // Vitreous Mercoxit
    '1227',   // Omber
    '17867',  // Silvery Omber
    '17868'  // Golden Omber
];

var iceIds = [
    //ICE
    '16262', //   Clear Icicle
    '17978', //   Enriched Clear Icicle
    '16263', //   Glacial Mass
    '17977', //   Smooth Glacial Mass
    '16264', //   Blue Ice
    '17975', //   Thick Blue Ice
    '16265', //   White Glaze
    '17976', //   Pristine White Glaze
    '16266', //   Glare Crust
    '16267'  //   Dark Glitter
];

exports.updateOreData = function updateOreData(req, res) {
    var items = [];
    var allPromises = [];
    for(var oreId in oreIds) {
        var options = {
            uri: eveItemCrestEndpoint + oreIds[oreId] +'/',
            json: true
        };
        allPromises.push(RequestPromise(options));
    }
    Promise.all(allPromises).then(function (responseItems){
        for(var item in responseItems){
            var newItem = new itemModel({
                _id : responseItems[item].id,
                name: responseItems[item].name,
                description: responseItems[item].description,
                itemType: 1,
                volume: responseItems[item].volume,
                imgUrlLrg: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_64.png',
                imgUrlSml: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_32.png'
            });
            newItem.save();
            items.push(newItem);
        }
        res.json(items);
    }).catch(function(err){
        console.log(err);
    });
};

exports.updateIceData = function updateIceData(req, res) {
    var items = [];
    var allPromises = [];
    for(var iceId in iceIds) {
        var options = {
            uri: eveItemCrestEndpoint + iceIds[iceId] +'/',
            json: true
        };
        allPromises.push(RequestPromise(options));
    }
    Promise.all(allPromises).then(function (responseItems){
        for(var item in responseItems){
            var newItem = new itemModel({
                _id : responseItems[item].id,
                name: responseItems[item].name,
                description: responseItems[item].description,
                itemType: 2,
                volume: responseItems[item].volume,
                imgUrlLrg: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_64.png',
                imgUrlSml: 'https://imageserver.eveonline.com/Type/'+responseItems[item].id+'_32.png'
            });
            newItem.save();
            items.push(newItem);
        }
        res.json(items);
    }).catch(function(err){
        console.log(err);
    });
};

