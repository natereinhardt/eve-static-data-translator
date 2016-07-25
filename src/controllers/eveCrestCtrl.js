'use strict';

var async = require("async");
var RequestPromise = require("request-promise");
//var request = Promise.promisifyAll(require("request"), {multiArgs: true});

//var eveMarketCrestEndpoint = 'https://crest-tq.eveonline.com/market/10000002/orders/sell/?type=https://crest-tq.eveonline.com/inventory/types/';

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
    var items = [];
    var errors = [];

    for(var itemId in itemIds) {

        var options = {
            uri: eveItemCrestEndpoint + itemIds[itemId] +'/',
            json: true
        };

        RequestPromise(options).then(function (item){
            //console.log(item);
            items.push(item);

        }).catch(function(err){
            console.log(err);
            errors.push(err);
            //console.log(err)
        });
    }
    console.log(items);
    console.log(errors);
    res.type('application/json');
    res.json(items);
};

