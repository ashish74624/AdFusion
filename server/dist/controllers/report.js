"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _report = require("./../models/report");

var _report2 = _interopRequireDefault(_report);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  list: function list(query) {
    return new Promise(function (resolve, reject) {
      _report2.default.find(query).then(function (res) {
        if (res) console.log({ query: query }, "Lists Reports");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  retrieve: function retrieve(query) {
    return new Promise(function (resolve, reject) {
      _report2.default.findOne(query).then(function (res) {
        if (res) console.log({ query: query }, "Retrieves Report");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  create: function create(query) {
    return new Promise(function (resolve, reject) {
      _report2.default.create(query).then(function (res) {
        if (res) console.log({ query: query }, "Creates Report");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  update: function update(query, document) {
    return new Promise(function (resolve, reject) {
      _report2.default.findOneAndUpdate(query, document).then(function (res) {
        if (res) console.log({ query: query }, "Updates Report");
        return resolve(res);
      }).catch(function (error) {
        return reject(error);
      });
    });
  },
  overview: function overview() {
    return new Promise(function (resolve, reject) {
      var query = {
        date: {
          $gte: (0, _moment2.default)().subtract(6, "d").format("YYYY-MM-DD"),
          $lte: (0, _moment2.default)().format("YYYY-MM-DD")
        }
      };

      _report2.default.aggregate([{ $match: query }, {
        $project: {
          impressions: "$impressions",
          clicks: "$clicks",
          date: { $substr: ["$date", 5, 9] }
        }
      }, {
        $group: {
          _id: { date: "$date" },
          date: { $first: "$date" },
          impressions: { $sum: "$impressions" },
          clicks: { $sum: "$clicks" }
        }
      }]).then(function (reports) {
        var dateRanges = [];
        var impressions = [];
        var clicks = [];

        for (var i = 6; i != -1; i -= 1) {
          dateRanges.push((0, _moment2.default)().add(-i, "day").format("MM-DD"));
        }

        for (var _i = 0; _i < dateRanges.length; _i += 1) {
          var dateRange = dateRanges[_i];

          for (var t = 0; t < reports.length; t += 1) {
            var report = reports[t];

            if (dateRange === report.date) {
              impressions.push(report.impressions);
              clicks.push(report.clicks);
              break;
            } else if (t + 1 === reports.length) {
              impressions.push(0);
              clicks.push(0);
            }
          }
        }

        if (!reports.length) {
          for (var _i2 = 0; _i2 < dateRanges.length; _i2 += 1) {
            impressions.push(0);
            clicks.push(0);
          }
        }

        return resolve({
          labels: dateRanges,
          impressions: impressions,
          clicks: clicks
        });
      }).catch(function (error) {
        return reject(error);
      });
    });
  }
};
//# sourceMappingURL=report.js.map