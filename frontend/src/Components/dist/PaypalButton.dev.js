"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PayPalButton = paypal.Buttons.driver("react", {
  React: _react["default"],
  ReactDOM: _reactDom["default"]
});
var _default = PayPalButton;
exports["default"] = _default;