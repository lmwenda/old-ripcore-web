"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.conn = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _UserRoutes = _interopRequireDefault(require("./Routes/UserRoutes.js"));

var _FileRoutes = _interopRequireDefault(require("./Routes/FileRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Initializations
var app = (0, _express["default"])();

_dotenv["default"].config(); // Connecting to Database


var conn = _mongoose["default"].connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function () {
  return console.log("Connected to Database.");
}); // Middlewares


exports.conn = conn;
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"]["static"]('public'));
app.use(_express["default"]["static"]('uploads')); // Route Middlewares

app.use("/api/users", _UserRoutes["default"]);
app.use('/api/files', _FileRoutes["default"]); // Exporting Application

var _default = app;
exports["default"] = _default;