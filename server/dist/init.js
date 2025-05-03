"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publisher = require("./controllers/publisher");

var _publisher2 = _interopRequireDefault(_publisher);

var _zone = require("./controllers/zone");

var _zone2 = _interopRequireDefault(_zone);

var _advertiser = require("./controllers/advertiser");

var _advertiser2 = _interopRequireDefault(_advertiser);

var _campaign = require("./controllers/campaign");

var _campaign2 = _interopRequireDefault(_campaign);

var _adItem = require("./controllers/adItem");

var _adItem2 = _interopRequireDefault(_adItem);

var _campaignAssignment = require("./controllers/campaignAssignment");

var _campaignAssignment2 = _interopRequireDefault(_campaignAssignment);

var _placement = require("./controllers/placement");

var _placement2 = _interopRequireDefault(_placement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function () {
  var publishers = await _publisher2.default.list({});
  var zones = await _zone2.default.list({});
  var advertisers = await _advertiser2.default.list({});
  var campaigns = await _campaign2.default.list({});
  var adItems = await _adItem2.default.list({});
  var campaignAssignments = await _campaignAssignment2.default.list({});
  var placements = await _placement2.default.list({});

  if (!publishers.length && !zones.length && !advertisers.length && !campaigns.length && !adItems.length && !campaignAssignments.length && !placements.length) {
    var publisher = await _publisher2.default.create({ name: "Default Publisher" });
    var zone = await _zone2.default.create({ name: "Default Zone", publisher: publisher.id });
    var advertiser = await _advertiser2.default.create({ name: "Default Advertiser" });
    var campaign = await _campaign2.default.create({ name: "Default Campaign", advertiser: advertiser.id });
    var adItem = await _adItem2.default.create({
      name: "Default Ad Item",
      width: 300,
      height: 250,
      location: "http://kijepark.com",
      creative_url: "https://i.ibb.co/kqR8Z8r/banner.jpg",
      html_target: "_blank"
    });
    var campaignAssignment = await _campaignAssignment2.default.create({
      advertisement: {
        id: adItem.id
      },
      campaign: {
        id: campaign.id
      }
    });
    var placement = await _placement2.default.create({
      zone: {
        id: zone.id
      },
      advertisement: {
        id: campaign.id,
        type: campaign.object
      }
    });
  }
};
//# sourceMappingURL=init.js.map