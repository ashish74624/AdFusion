"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _adItem = require("./../controllers/adItem");

var _adItem2 = _interopRequireDefault(_adItem);

var _campaignAssignment = require("./../controllers/campaignAssignment");

var _campaignAssignment2 = _interopRequireDefault(_campaignAssignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/aditem/create", async function (req, res) {
  try {
    var campaignID = req.body.campaign_id;
    var name = req.body.name;
    var location = req.body.link;
    var creativeUrl = req.body.image_url;
    var size = req.body.size;
    var width = size.split("x")[0];
    var height = size.split("x")[1];
    var htmlTarget = req.body.html_target;

    var adItem = await _adItem2.default.create({
      name: name,
      location: location,
      creative_url: creativeUrl,
      width: width,
      height: height,
      html_target: htmlTarget
    });

    await _campaignAssignment2.default.create({
      "advertisement.id": adItem.id,
      "campaign.id": campaignID
    });

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

router.post("/aditem/delete", async function (req, res) {
  try {
    var adItemIDs = req.body.ids;

    // Find campaignAssignments related to the ad item and delete it all
    for (var i = 0; i < adItemIDs.length; i += 1) {
      var adItemID = adItemIDs[i];

      await _campaignAssignment2.default.delete({ "advertisement.id": adItemID });
      await _adItem2.default.delete({ id: adItemID });
    }

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

exports.default = router;
//# sourceMappingURL=adItem.js.map