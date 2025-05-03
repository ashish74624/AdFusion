"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _placement = require("./../controllers/placement");

var _placement2 = _interopRequireDefault(_placement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/placement/create", async function (req, res) {
  try {
    var zoneID = parseInt(req.body.zone_id);
    var campaignID = parseInt(req.body.campaign_id);

    await _placement2.default.create({
      "zone.id": zoneID,
      "advertisement.id": campaignID
    });

    return res.send();
  } catch (error) {
    return res.send(error);
  }
});

router.post("/placement/delete", async function (req, res) {
  try {
    var campaignIDs = req.body.ids;
    var zoneID = req.body.zone_id;

    for (var i = 0; i < campaignIDs.length; i += 1) {
      var campaignID = parseInt(campaignIDs[i]);

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
//# sourceMappingURL=placement.js.map