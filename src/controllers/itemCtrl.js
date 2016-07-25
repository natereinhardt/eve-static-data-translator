var Item = require('./../models/itemModel');

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





module.exports.create = function (req, res) {

    var item = new Item();
    item.name = req.params;

    item.save(function (err, result) {
        res.json(result);
    });
};
module.exports.list = function (req, res) {
    Item.find({}, function (err, results) {
        res.json(results);
    });
};
