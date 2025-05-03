"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _campaignAssignment = require("./../models/campaignAssignment");

var _campaignAssignment2 = _interopRequireDefault(_campaignAssignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  list: function list(query) {
    return new Promise(function (resolve, reject) {
      _campaignAssignment2.default.find(query).then(function (res) {
        if (res) console.log({ query: query }, "Lists CampaignAssignments");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  create: function create(query) {
    return new Promise(function (resolve, reject) {
      _campaignAssignment2.default.create(query).then(function (res) {
        if (res) console.log({ query: query }, "Creates CampaignAssignment");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  delete: function _delete(query) {
    return new Promise(function (resolve, reject) {
      _campaignAssignment2.default.deleteMany(query).then(function (res) {
        if (res.deletedCount) console.log({ query: query }, "Deletes CampaignAssignment");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
};
//# sourceMappingURL=campaignAssignment.js.map