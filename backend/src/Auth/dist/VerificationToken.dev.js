"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = VerificationToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function VerificationToken(req, res, next, user) {
  var token = req.headers['verification-token'];
  if (!token) return res.status(400).send("Invalid Access Token.");

  try {
    var verified = _jsonwebtoken["default"].verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
      if (err) {
        res.json({
          auth: false,
          msg: 'You Failed the Authentication Process'
        });
      } else {
        user = decoded.id;
      }
    });

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token:", err);
  }
}