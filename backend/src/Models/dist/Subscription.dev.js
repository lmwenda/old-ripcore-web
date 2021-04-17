"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SubscriptionSchema = _mongoose["default"].Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
});