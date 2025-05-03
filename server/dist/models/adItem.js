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
  id: {
    type: Number,
    default: 0,
    unique: true,
    required: true
  },
  object: {
    type: String,
    default: "ad_item",
    required: true
  },
  name: {
    type: String,
    default: "",
    required: true
  },
  width: {
    type: Number,
    default: 300,
    required: true
  },
  height: {
    type: Number,
    default: 250,
    required: true
  },
  location: {
    type: String,
    default: ""
  },
  creative_url: {
    type: String,
    default: ""
  },
  html_target: {
    type: String,
    default: ""
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "ad_item_id",
  inc_field: "id",
  collection_name: "ids"
});

exports.default = _mongoose2.default.model("ad_item", schema);
//# sourceMappingURL=adItem.js.map