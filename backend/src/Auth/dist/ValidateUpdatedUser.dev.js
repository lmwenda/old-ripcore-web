"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateUpdatedUser = ValidateUpdatedUser;
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ValidateUpdatedUser(body) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().min(4).required().email(),
    username: _joi["default"].string().min(3).required(),
    password: _joi["default"].string().min(6).required()
  });

  return schema.validate(body);
}

var _default = ValidateUpdatedUser;
exports["default"] = _default;