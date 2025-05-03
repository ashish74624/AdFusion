"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _report = require("./../controllers/report");

var _report2 = _interopRequireDefault(_report);

var _publisher = require("./../controllers/publisher");

var _publisher2 = _interopRequireDefault(_publisher);

var _advertiser = require("./../controllers/advertiser");

var _advertiser2 = _interopRequireDefault(_advertiser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/", async function (req, res, next) {
  try {
    var reports = await _report2.default.overview();
    var publishersAndZones = await _publisher2.default.listAndZones({});
    var advertisersAndZones = await _advertiser2.default.listAndCampaigns({});

    return res.render("dashboard", {
      reports: JSON.stringify(reports),
      publishers: publishersAndZones,
      advertisers: advertisersAndZones
    });
  } catch (error) {
    return next(error);
  }
});

exports.default = router;
//# sourceMappingURL=dashboard.js.map