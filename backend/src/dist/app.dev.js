"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _paypalRestSdk = _interopRequireDefault(require("paypal-rest-sdk"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _UserRoutes = _interopRequireDefault(require("./Routes/UserRoutes.js"));

var _FileRoutes = _interopRequireDefault(require("./Routes/FileRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Configurations
_dotenv["default"].config();
/*
 Paypal Configuration Modes:
 Sandbox
 Live

 If you are Developing or in Development mode put Sandbox but if you are pushing to the
 real branch then put Live
*/


_paypalRestSdk["default"].configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
}); // Initializations


var app = (0, _express["default"])(); // Connecting to Database

_mongoose["default"].connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function () {
  return console.log("Connected to Database.");
}); // Middlewares


app.use((0, _cors["default"])({
  exposedHeaders: "verification-token, user-id"
}));
app.use(_express["default"].json());
app.use((0, _expressFileupload["default"])()); // Route Middlewares

app.use("/api/users", _UserRoutes["default"]);
app.use("/api/pack", _FileRoutes["default"]); // Exporting Application

var _default = app;
exports["default"] = _default;