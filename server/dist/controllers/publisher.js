"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _publisher = require("./../models/publisher");

var _publisher2 = _interopRequireDefault(_publisher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  list: function list(query) {
    return new Promise(function (resolve, reject) {
      _publisher2.default.find(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Lists Publishers");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  listAndZones: function listAndZones(query) {
    return new Promise(function (resolve, reject) {
      _publisher2.default.aggregate([{ $match: query }, {
        $lookup: {
          from: "zones",
          localField: "id",
          foreignField: "publisher",
          as: "zones"
        }
      }]).then(function (res) {
        if (res) console.log({ query: query }, "Lists Publishers and Zones");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  retrieve: function retrieve(query) {
    return new Promise(function (resolve, reject) {
      _publisher2.default.findOne(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Retrieves Publisher");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  create: function create(query) {
    return new Promise(function (resolve, reject) {
      _publisher2.default.create(query).then(function (res) {
        if (res) console.log({ query: query }, "Creates Publisher");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  delete: function _delete(query) {
    return new Promise(function (resolve, reject) {
      _publisher2.default.deleteMany(query).then(function (res) {
        if (res.deletedCount) console.log({ query: query }, "Deletes Publisher");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
};
//# sourceMappingURL=publisher.js.map