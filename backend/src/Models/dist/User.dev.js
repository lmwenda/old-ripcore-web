"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserSchema = _mongoose["default"].Schema({
  // User Account Details
  email: {
    type: String
  },
  username: {
    type: String,
    min: 3,
    max: 30
  },
  password: {
    type: String,
    min: 6,
    max: 1024
  },
  // Subscription/Membership Fields
  subscribed: {
    type: Boolean
  },
  membership: {
    type: String
  },
  // Date Field
  date: {
    type: Date,
    "default": Date.now()
  }
});

var User = _mongoose["default"].model("User", UserSchema);

var _default = User;
exports["default"] = _default;