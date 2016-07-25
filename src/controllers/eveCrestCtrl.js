'use strict';

var async = require("async");
var RequestPromise = require("request-promise");
var Promise = require("bluebird");

var eveItemCrestEndpoint = 'https://crest-tq.eveonline.com/inventory/types/';

var itemIds = [
    '22' ,
    '17425',
    '17426',
    '1223',
    '17428',
    '17429',
    '1225',
    '17432',
    '17433',
    '1232',
    '17436',
    '17437',
    '21',
    '17440',
    '17441',
    '1231',
    '17444',
    '17445',
    '1226',
    '17448',
    '17449',
    '20',
    '17452',
    '17453',
    '18',
    '17455',
    '17456',
    '1224',
    '17459',
    '17460',
    '1228',
    '17463',
    '17464',
    '19',
    '17466',
    '17467',
    '1230',
    '17470',
    '17471',
    '1229',
    '17865',
    '17866',
    '11396',
    '17869',
    '17870',
    '1227',
    '17867',
    '17868',
    '16262',
    '17978',
    '16263',
    '17977',
    '16264',
    '17975',
    '16265',
    '17976',
    '16266',
    '16267'
];

exports.getItemData =function getItemData(req, res) {
    var errors = [];
    var allPromises = [];
    for(var itemId in itemIds) {
        var options = {
            uri: eveItemCrestEndpoint + itemIds[itemId] +'/',
            json: true
        };
        allPromises.push(RequestPromise(options));
    }
    Promise.all(allPromises).then(function (items){
        for(var item in items){
            console.log(items[item].id)
        }
        console.log(items.id);
        res.json(items);
    }).catch(function(err){
        console.log(err);
        errors.push(err);
    });
};

