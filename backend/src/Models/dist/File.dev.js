"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// File Schema
var FileSchema = _mongoose["default"].Schema({}); // Exporting the File Model


var File = _mongoose["default"].model('File', FileSchema);

var _default = File;
exports["default"] = _default;