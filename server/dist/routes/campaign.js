"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _publisher = require("./../controllers/publisher");

var _publisher2 = _interopRequireDefault(_publisher);

var _campaign = require("./../controllers/campaign");

var _campaign2 = _interopRequireDefault(_campaign);

var _campaignAssignment = require("./../controllers/campaignAssignment");

var _campaignAssignment2 = _interopRequireDefault(_campaignAssignment);

var _adItem = require("./../controllers/adItem");

var _adItem2 = _interopRequireDefault(_adItem);

var _placement = require("./../controllers/placement");

var _placement2 = _interopRequireDefault(_placement);

var _zone = require("./../controllers/zone");

var _zone2 = _interopRequireDefault(_zone);

var _advertiser = require("./../controllers/advertiser");

var _advertiser2 = _interopRequireDefault(_advertiser);

var _report2 = require("./../controllers/report");

var _report3 = _interopRequireDefault(_report2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/campaign/view", async function (req, res, next) {
  try {
    var publishersAndZones = await _publisher2.default.listAndZones({});
    var advertisersAndZones = await _advertiser2.default.listAndCampaigns({});

    var campaignID = parseInt(req.query.campaign_id);
    var campaign = await _campaign2.default.retrieve({ id: campaignID });

    var campaignAssignments = await _campaignAssignment2.default.list({ "campaign.id": campaignID });
    var adItems = [];

    for (var i = 0; i < campaignAssignments.length; i += 1) {
      var campaignAssignment = campaignAssignments[i];
      var adItem = await _adItem2.default.retrieve({ id: campaignAssignment.advertisement.id });

      // Add total impressions and clicks regarding campaign
      var reports = await _report3.default.list({
        "ad_item.id": adItem.id,
        "campaign.id": campaignID
      });

      var totalImpressions = 0;
      var clicks = 0;
      for (var t = 0; t < reports.length; t += 1) {
        var report = reports[t];

        totalImpressions += report.impressions;
        clicks += report.clicks;
      }
      adItem.total_impressions = totalImpressions;
      adItem.clicks = clicks;

      adItems.push(adItem);
    }

    var placements = await _placement2.default.list({ "advertisement.id": campaignID });
    var zones = [];

    for (var _i = 0; _i < placements.length; _i += 1) {
      var placement = placements[_i];
      var zone = await _zone2.default.retrieve({ id: placement.zone.id });

      // Add total impressions and clicks regarding Placement
      var _reports = await _report3.default.list({
        "placement": placement.id,
        "zone.id": zone.id
      });

      var _totalImpressions = 0;
      for (var _t = 0; _t < _reports.length; _t += 1) {
        var _report = _reports[_t];

        _totalImpressions += _report.impressions;
      }
      zone.total_impressions = _totalImpressions;

      zones.push(zone);
    }

    return res.render("campaign/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      campaign: campaign,
      ad_items: adItems,
      zones: zones
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/campaign/create", async function (req, res) {
  try {
    var advertiserID = req.body.advertiser_id;
    var name = req.body.name;


    await _campaign2.default.create({
      advertiser: advertiserID,
      name: name
    });

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

router.post("/campaign/delete", async function (req, res) {
  try {
    var campaignIDs = req.body.ids;

    for (var i = 0; i < campaignIDs.length; i += 1) {
      // Find ad campaignAssignments related to the campaign and find ad items
      var campaignID = campaignIDs[i];
      var campaignAssignments = await _campaignAssignment2.default.list({ "campaign.id": campaignID });

      for (var t = 0; t < campaignAssignments.length; t += 1) {
        var campaignAssignment = campaignAssignments[t];
        var adItemID = campaignAssignment.advertisement.id;

        await _campaignAssignment2.default.delete({ "advertisement.id": adItemID });
        await _adItem2.default.delete({ id: adItemID });
      }

      // Find placements related to the campaign and delete it all
      await _placement2.default.delete({ "advertisement.id": campaignID });

      await _campaign2.default.delete({ id: campaignID });
    }

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

router.post("/campaign/zone/assign", async function (req, res) {
  try {
    var campaignID = parseInt(req.body.campaign_id);
    var campaign = await _campaign2.default.retrieve({ id: campaignID });

    var campaignAssignments = await _campaignAssignment2.default.list({ "campaign.id": campaign.id });
    var adItemSizes = [];

    for (var i = 0; i < campaignAssignments.length; i += 1) {
      var campaignAssignment = campaignAssignments[i];
      var adItem = await _adItem2.default.retrieve({
        id: campaignAssignment.advertisement.id
      });

      adItemSizes.push({
        width: adItem.width,
        height: adItem.height
      });
    }

    var eligibleZones = [];
    var zones = await _zone2.default.list({});

    for (var _i2 = 0; _i2 < zones.length; _i2 += 1) {
      var zone = zones[_i2];

      for (var t = 0; t < adItemSizes.length; t += 1) {
        var adItemSize = adItemSizes[t];

        if (zone.width === adItemSize.width && zone.height === adItemSize.height) {
          if (eligibleZones.indexOf(zone) == -1) {
            eligibleZones.push(zone);
          }
        }
      }
    }

    var response = [];
    for (var _i3 = 0; _i3 < eligibleZones.length; _i3 += 1) {
      var eligibleZone = eligibleZones[_i3];
      var publisher = await _publisher2.default.retrieve({ id: eligibleZone.publisher });

      response.push({
        id: eligibleZone.id,
        name: eligibleZone.name,
        publisher: publisher.name,
        size: eligibleZone.width + "x" + eligibleZone.height
      });
    }

    return res.send(response);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/campaign/zone/unassign", async function (req, res) {
  try {
    var zoneIDs = req.body.ids;
    var campaignID = req.body.campaign_id;

    for (var i = 0; i < zoneIDs.length; i += 1) {
      var zoneID = parseInt(zoneIDs[i]);

      await _placement2.default.delete({
        "zone.id": zoneID,
        "advertisement.id": campaignID
      });
    }

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

exports.default = router;
//# sourceMappingURL=campaign.js.map