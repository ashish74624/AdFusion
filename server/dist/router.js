"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _dashboard = require("./routes/dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

var _publisher = require("./routes/publisher");

var _publisher2 = _interopRequireDefault(_publisher);

var _zone = require("./routes/zone");

var _zone2 = _interopRequireDefault(_zone);

var _advertiser = require("./routes/advertiser");

var _advertiser2 = _interopRequireDefault(_advertiser);

var _campaign = require("./routes/campaign");

var _campaign2 = _interopRequireDefault(_campaign);

var _adServe = require("./routes/adServe");

var _adServe2 = _interopRequireDefault(_adServe);

var _placement = require("./routes/placement");

var _placement2 = _interopRequireDefault(_placement);

var _adItem = require("./routes/adItem");

var _adItem2 = _interopRequireDefault(_adItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(_dashboard2.default);
router.use(_publisher2.default);
router.use(_zone2.default);
router.use(_advertiser2.default);
router.use(_campaign2.default);
router.use(_adServe2.default);
router.use(_placement2.default);
router.use(_adItem2.default);

exports.default = router;
//# sourceMappingURL=router.js.map