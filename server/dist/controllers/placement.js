"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _placement = require("./../models/placement");

var _placement2 = _interopRequireDefault(_placement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  list: function list(query) {
    return new Promise(function (resolve, reject) {
      _placement2.default.find(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Lists Placements");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  create: function create(query) {
    return new Promise(function (resolve, reject) {
      _placement2.default.create(query).then(function (res) {
        if (res) console.log({ query: query }, "Creates Placement");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  delete: function _delete(query) {
    return new Promise(function (resolve, reject) {
      _placement2.default.deleteMany(query).then(function (res) {
        if (res.deletedCount) console.log({ query: query }, "Deletes Placement");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
};
//# sourceMappingURL=placement.js.map