"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseSequence = require("mongoose-sequence");

var _mongooseSequence2 = _interopRequireDefault(_mongooseSequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongooseSequence = (0, _mongooseSequence2.default)(_mongoose2.default);
var schema = new _mongoose2.default.Schema({
  placement: {
    type: Number,
    default: 0,
    required: true
  },
  ad_item: {
    type: {
      type: String,
      default: "ad_item",
      required: true
    },
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  campaign: {
    type: {
      type: String,
      default: "campaign",
      required: true
    },
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  zone: {
    type: {
      type: String,
      default: "zone",
      required: true
    },
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  impressions: {
    type: Number,
    default: 0,
    required: true
  },
  clicks: {
    type: Number,
    default: 0,
    required: true
  },
  date: {
    type: String,
    default: "",
    required: true
  }
});

exports.default = _mongoose2.default.model("report", schema);
//# sourceMappingURL=report.js.map