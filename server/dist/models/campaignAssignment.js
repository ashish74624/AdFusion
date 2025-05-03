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
    default: "campaign_assignment",
    required: true
  },
  advertisement: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  campaign: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  }
});

// add unique id
schema.plugin(mongooseSequence, {
  id: "campaign_assignment_id",
  inc_field: "id",
  collection_name: "ids"
});

exports.default = _mongoose2.default.model("campaign_assignment", schema);
//# sourceMappingURL=campaignAssignment.js.map