"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adItem = require("./../models/adItem");

var _adItem2 = _interopRequireDefault(_adItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  list: function list(query) {
    return new Promise(function (resolve, reject) {
      _adItem2.default.find(query).then(function (res) {
        if (res) console.log({ query: query }, "Lists AdItems");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  retrieve: function retrieve(query) {
    return new Promise(function (resolve, reject) {
      _adItem2.default.findOne(query).lean().exec().then(function (res) {
        if (res) console.log({ query: query }, "Retrieves AdItem");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  create: function create(query) {
    return new Promise(function (resolve, reject) {
      _adItem2.default.create(query).then(function (res) {
        if (res) console.log({ query: query }, "Creates AdItem");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  delete: function _delete(query) {
    return new Promise(function (resolve, reject) {
      _adItem2.default.deleteMany(query).then(function (res) {
        if (res.deletedCount) console.log({ query: query }, "Deletes AdItem");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
};
//# sourceMappingURL=adItem.js.map