"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidateUser = ValidateUser;
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ValidateUser(body) {
  var schema = _joi["default"].object({
    username: _joi["default"].string().min(3).required(),
    email: _joi["default"].string().min(4).required().email(),
    password: _joi["default"].string().min(6).required(),
    membership: _joi["default"].string().required()
  });

  return schema.validate(body);
}

var _default = ValidateUser;
exports["default"] = _default;