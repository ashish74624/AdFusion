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

var _advertiser = require("./../controllers/advertiser");

var _advertiser2 = _interopRequireDefault(_advertiser);

var _placement = require("./../controllers/placement");

var _placement2 = _interopRequireDefault(_placement);

var _campaign2 = require("./../controllers/campaign");

var _campaign3 = _interopRequireDefault(_campaign2);

var _campaignAssignment = require("./../controllers/campaignAssignment");

var _campaignAssignment2 = _interopRequireDefault(_campaignAssignment);

var _adItem = require("./../controllers/adItem");

var _adItem2 = _interopRequireDefault(_adItem);

var _report = require("./../controllers/report");

var _report2 = _interopRequireDefault(_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/zone/view", async function (req, res, next) {
  try {
    var publishersAndZones = await _publisher2.default.listAndZones({});
    var advertisersAndZones = await _advertiser2.default.listAndCampaigns({});

    var zoneID = parseInt(req.query.zone_id);
    var zone = await _zone2.default.retrieve({ id: zoneID });
    var placements = await _placement2.default.list({ "zone.id": zone.id });
    var assignedCampaigns = [];

    for (var i = 0; i < placements.length; i += 1) {
      var placement = placements[i];
      var campaign = await _campaign3.default.retrieve({ id: placement.advertisement.id });

      // Add total impressions regarding Placement
      var reports = await _report2.default.list({
        placement: placement.id,
        "campaign.id": campaign.id
      });

      var totalImpressions = 0;
      for (var t = 0; t < reports.length; t += 1) {
        totalImpressions += reports[t].impressions;
      }
      campaign.total_impressions = totalImpressions;

      assignedCampaigns.push(campaign);
    }

    return res.render("zone/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      zone: zone,
      assigned_campaigns: assignedCampaigns
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/zone/create", async function (req, res) {
  try {
    var publisherID = req.body.publisher_id;
    var _req$body = req.body,
        name = _req$body.name,
        size = _req$body.size;

    var width = size.split("x")[0];
    var height = size.split("x")[1];

    await _zone2.default.create({
      publisher: publisherID,
      name: name,
      width: width,
      height: height
    });

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

router.post("/zone/delete", async function (req, res) {
  try {
    var zoneIDs = req.body.ids;

    // Find placements related to the zone and delete it all
    for (var i = 0; i < zoneIDs.length; i += 1) {
      var zoneID = zoneIDs[i];

      await _placement2.default.delete({ "zone.id": zoneID });
      await _zone2.default.delete({ id: zoneID });
    }

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

router.post("/zone/campaign/assign", async function (req, res) {
  try {
    var zoneID = parseInt(req.body.zone_id);
    var zone = await _zone2.default.retrieve({ id: zoneID });

    var campaigns = await _campaign3.default.list({});
    var response = [];

    for (var i = 0; i < campaigns.length; i += 1) {
      var campaign = campaigns[i];
      campaign.eligible_ad_items = [];

      var campaignAssignments = await _campaignAssignment2.default.list({ "campaign.id": campaign.id });

      for (var t = 0; t < campaignAssignments.length; t += 1) {
        var campaignAssignment = campaignAssignments[t];
        var adItems = await _adItem2.default.list({
          id: campaignAssignment.advertisement.id
        });

        for (var z = 0; z < adItems.length; z += 1) {
          var adItem = adItems[z];

          if (zone.width === adItem.width && zone.height === adItem.height) {
            campaign.eligible_ad_items.push(adItem);
          }
        }
      }
    }

    for (var _i = 0; _i < campaigns.length; _i += 1) {
      var _campaign = campaigns[_i];
      var advertiser = await _advertiser2.default.retrieve({ id: _campaign.advertiser });

      response.push({
        id: _campaign.id,
        name: _campaign.name,
        eligible_ad_items: _campaign.eligible_ad_items.length,
        advertiser: advertiser.name
      });
    }

    return res.send(response);
  } catch (error) {
    return res.send(error);
  }
});

exports.default = router;
//# sourceMappingURL=zone.js.map