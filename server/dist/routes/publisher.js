"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _publisher = require("./../controllers/publisher");

var _publisher2 = _interopRequireDefault(_publisher);

var _zone = require("./../controllers/zone");

var _zone2 = _interopRequireDefault(_zone);

var _placement = require("./../controllers/placement");

var _placement2 = _interopRequireDefault(_placement);

var _advertiser = require("./../controllers/advertiser");

var _advertiser2 = _interopRequireDefault(_advertiser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/publisher/list", async function (req, res, next) {
  try {
    var publishersAndZones = await _publisher2.default.listAndZones({});
    var advertisersAndZones = await _advertiser2.default.listAndCampaigns({});

    return res.render("publisher/list", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/publisher/view", async function (req, res, next) {
  try {
    var publishersAndZones = await _publisher2.default.listAndZones({});
    var advertisersAndZones = await _advertiser2.default.listAndCampaigns({});

    var publisherID = parseInt(req.query.publisher_id);
    var publisher = await _publisher2.default.retrieve({ id: publisherID });
    var zones = await _zone2.default.listAndPlacements({ publisher: publisherID });

    return res.render("publisher/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      publisher: publisher,
      zones: zones
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/publisher/create", async function (req, res) {
  try {
    var _req$body = req.body,
        name = _req$body.name,
        domain = _req$body.domain;


    await _publisher2.default.create({
      name: name,
      domain: domain
    });

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

router.post("/publisher/delete", async function (req, res) {
  try {
    var publisherIDs = req.body.ids;

    for (var i = 0; i < publisherIDs.length; i += 1) {
      var publisherID = publisherIDs[i];

      // Find zones related to the publisher and delete it all
      var zones = await _zone2.default.list({ publisher: publisherID });

      // Find placements related to the zone and delete it all
      for (var t = 0; t < zones.length; t += 1) {
        var zoneID = zones[t].id;

        await _placement2.default.delete({ "zone.id": zoneID });
        await _zone2.default.delete({ id: zoneID });
      }

      // Delete a publisher
      await _publisher2.default.delete({ id: publisherID });
    }

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

exports.default = router;
//# sourceMappingURL=publisher.js.map