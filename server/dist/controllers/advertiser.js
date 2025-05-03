"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _advertiser = require("./../models/advertiser");

var _advertiser2 = _interopRequireDefault(_advertiser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  list: function list(query) {
    return new Promise(function (resolve, reject) {
      _advertiser2.default.find(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Lists Advertisers");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  listAndCampaigns: function listAndCampaigns(query) {
    return new Promise(function (resolve, reject) {
      _advertiser2.default.aggregate([{ $match: query }, {
        $lookup: {
          from: "campaigns",
          localField: "id",
          foreignField: "advertiser",
          as: "campaigns"
        }
      }]).then(function (res) {
        if (res) console.log({ query: query }, "Lists Advertisers and Campaigns");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  retrieve: function retrieve(query) {
    return new Promise(function (resolve, reject) {
      _advertiser2.default.findOne(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Retrieves Advertiser");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  create: function create(query) {
    return new Promise(function (resolve, reject) {
      _advertiser2.default.create(query).then(function (res) {
        if (res) console.log({ query: query }, "Creates Advertiser");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  delete: function _delete(query) {
    return new Promise(function (resolve, reject) {
      _advertiser2.default.deleteMany(query).then(function (res) {
        if (res.deletedCount) console.log({ query: query }, "Deletes Advertiser");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
};
//# sourceMappingURL=advertiser.js.map