"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.initialState = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initialState = {
  id: null,
  email: '',
  username: '',
  password: ''
};
exports.initialState = initialState;

var reducer = function reducer(state, action) {
  switch (action.type) {
    case _constants.REGISTER:
      _axios["default"].post('http://localhost:5000/api/users/register', {
        email: action.email,
        username: action.username,
        password: action.password
      });

    case _constants.LOGIN:
      _axios["default"].post('http://localhost:5000/api/users/login', {
        email: action.email,
        password: action.password
      });

    case _constants.GET_USER:
      _axios["default"].get("http://localhost:5000/api/users/user/".concat(action.id));

    default:
      return state;
  }
};

var _default = reducer;
exports["default"] = _default;