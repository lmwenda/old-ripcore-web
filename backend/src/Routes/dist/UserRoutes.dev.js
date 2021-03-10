"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _User = _interopRequireDefault(require("../Models/User.js"));

var _ValidateUser2 = _interopRequireDefault(require("../Auth/ValidateUser.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Exported Components
// Initializations
_dotenv["default"].config();

var router = _express["default"].Router(); // Logging in with Patreon
// REGISTER ROUTE


router.post("/register", function _callee(req, res) {
  var _ValidateUser, error, emailExists, salt, hashedPassword, user, savedUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // VALIDATING OUR USER
          _ValidateUser = (0, _ValidateUser2["default"])(req.body), error = _ValidateUser.error;

          if (!error) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: req.body.email
          }));

        case 5:
          emailExists = _context.sent;

          if (!emailExists) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Email Already Exists."));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

        case 10:
          salt = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(req.body.password, salt));

        case 13:
          hashedPassword = _context.sent;
          // CREATING OUR NEW USER
          user = new _User["default"]({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            membership: req.body.membership
          }); // Saving the User

          _context.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          savedUser = _context.sent;
          res.json(savedUser); // Redirecting the User

          res.redirect('/login');

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
}); // LOGIN ROUTE

router.post("/login", function _callee2(req, res) {
  var user, validPassword, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: req.body.email
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Invalid Email or Password."));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(req.body.password, user.password));

        case 8:
          validPassword = _context2.sent;

          if (validPassword) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Invalid Email or Password."));

        case 11:
          // CREATING AND ASSIGNING A JWT TOKEN
          token = _jsonwebtoken["default"].sign({
            _id: user._id
          }, process.env.SECRET_TOKEN);
          res.header("auth-token", token);
          res.status(200).send("Welcome back " + user.username + " to our Services!");
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); // Deleting the User

router["delete"]('/delete/user/:id', function (req, res) {
  _User["default"].findByIdAndDelete(req.params.id, function (err, user) {
    if (!err) {
      res.json(user);
    } else {
      res.json(err);
    }
  });

  res.send("Deleted User");
}); // Getting a Specific User

router.get('/user/:id', function (req, res) {
  _User["default"].findById(req.params.id, function (err, user) {
    if (!err) {
      res.json(user);
    } else {
      res.json(err);
    }
  });
}); // Updating User Account Details

router.put('/me/:id', function (req, res) {
  var user = _User["default"].findById(req.params.id);

  _User["default"].updateOne(user, req.body).then(console.log("Updated Account.")).then(res.send("Updated Account."));
}); // Verifing the User

router.post("/verify-account", function _callee3(req, res) {
  var token, decode;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = req.header("auth-token");
          decode = _jsonwebtoken["default"].decode(token);
          return _context3.abrupt("return", res.status(200).send(decode));

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send(_context3.t0);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
var _default = router;
exports["default"] = _default;