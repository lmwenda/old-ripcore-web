"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ImageSchema = new _mongoose["default"].Schema({
  filePath: String
}, {
  timestamps: true
});

var Image = _mongoose["default"].model('Image', ImageSchema);

var _default = Image;
exports["default"] = _default;