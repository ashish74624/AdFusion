"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _campaign = require("./../models/campaign");

var _campaign2 = _interopRequireDefault(_campaign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  list: function list(query) {
    return new Promise(function (resolve, reject) {
      _campaign2.default.find(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Lists Campaigns");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  listAndCampaignAssignments: function listAndCampaignAssignments(query) {
    return new Promise(function (resolve, reject) {
      _campaign2.default.aggregate([{ $match: query }, {
        $lookup: {
          from: "campaign_assignments",
          localField: "id",
          foreignField: "campaign.id",
          as: "campaign_assignments"
        }
      }, {
        $lookup: {
          from: "placements",
          localField: "id",
          foreignField: "advertisement.id",
          as: "placements"
        }
      }]).then(function (res) {
        if (res) console.log({ query: query }, "Lists Campaigns and Its Assignments");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  retrieve: function retrieve(query) {
    return new Promise(function (resolve, reject) {
      _campaign2.default.findOne(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Retrieves Campaign");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  create: function create(query) {
    return new Promise(function (resolve, reject) {
      _campaign2.default.create(query).then(function (res) {
        if (res) console.log({ query: query }, "Creates Campaign");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  delete: function _delete(query) {
    return new Promise(function (resolve, reject) {
      _campaign2.default.deleteMany(query).then(function (res) {
        if (res.deletedCount) console.log({ query: query }, "Deletes Campaign");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
};
//# sourceMappingURL=campaign.js.map