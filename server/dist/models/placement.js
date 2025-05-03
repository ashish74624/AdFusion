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
    default: "placement",
    required: true
  },
  zone: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  advertisement: {
    id: {
      type: Number,
      default: 0,
      required: true
    },
    type: {
      type: String,
      default: ""
    }
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "placement_id",
  inc_field: "id",
  collection_name: "ids"
});

exports.default = _mongoose2.default.model("placement", schema);
//# sourceMappingURL=placement.js.map