"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _zone = require("./../models/zone");

var _zone2 = _interopRequireDefault(_zone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  list: function list(query) {
    return new Promise(function (resolve, reject) {
      _zone2.default.find(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Lists Zones");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  listAndPlacements: function listAndPlacements(query) {
    return new Promise(function (resolve, reject) {
      _zone2.default.aggregate([{ $match: query }, {
        $lookup: {
          from: "placements",
          localField: "id",
          foreignField: "zone.id",
          as: "placements"
        }
      }]).then(function (res) {
        if (res) console.log({ query: query }, "Lists Zones and its Placements");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  retrieve: function retrieve(query) {
    return new Promise(function (resolve, reject) {
      _zone2.default.findOne(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Retrieves Zone");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  create: function create(query) {
    return new Promise(function (resolve, reject) {
      _zone2.default.create(query).then(function (res) {
        if (res) console.log({ query: query }, "Creates Zone");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  delete: function _delete(query) {
    return new Promise(function (resolve, reject) {
      _zone2.default.deleteMany(query).then(function (res) {
        if (res.deletedCount) console.log({ query: query }, "Deletes Zone");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
};
//# sourceMappingURL=zone.js.map