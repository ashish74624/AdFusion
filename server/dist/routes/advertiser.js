"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _publisher = require("./../controllers/publisher");

var _publisher2 = _interopRequireDefault(_publisher);

var _advertiser = require("./../controllers/advertiser");

var _advertiser2 = _interopRequireDefault(_advertiser);

var _campaign = require("./../controllers/campaign");

var _campaign2 = _interopRequireDefault(_campaign);

var _campaignAssignment = require("./../controllers/campaignAssignment");

var _campaignAssignment2 = _interopRequireDefault(_campaignAssignment);

var _adItem = require("./../controllers/adItem");

var _adItem2 = _interopRequireDefault(_adItem);

var _placement = require("./../controllers/placement");

var _placement2 = _interopRequireDefault(_placement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/advertiser/list", async function (req, res, next) {
  try {
    var publishersAndZones = await _publisher2.default.listAndZones({});
    var advertisersAndZones = await _advertiser2.default.listAndCampaigns({});

    return res.render("advertiser/list", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/advertiser/view", async function (req, res, next) {
  try {
    var publishersAndZones = await _publisher2.default.listAndZones({});
    var advertisersAndZones = await _advertiser2.default.listAndCampaigns({});

    var advertiserID = parseInt(req.query.advertiser_id);
    var advertiser = await _advertiser2.default.retrieve({ id: advertiserID });
    var campaigns = await _campaign2.default.listAndCampaignAssignments({ advertiser: advertiserID });

    return res.render("advertiser/view", {
      publishers: publishersAndZones,
      advertisers: advertisersAndZones,
      advertiser: advertiser,
      campaigns: campaigns
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/advertiser/create", async function (req, res) {
  try {
    var name = req.body.name;


    await _advertiser2.default.create({
      name: name
    });

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

router.post("/advertiser/delete", async function (req, res) {
  try {
    var advertiserIDs = req.body.ids;

    for (var i = 0; i < advertiserIDs.length; i += 1) {
      var advertiserID = advertiserIDs[i];
      var campaigns = await _campaign2.default.list({ advertiser: advertiserID });

      for (var c = 0; c < campaigns.length; c += 1) {
        var campaignID = campaigns[c].id;
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

      await _advertiser2.default.delete({ id: advertiserID });
    }

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

exports.default = router;
//# sourceMappingURL=advertiser.js.map