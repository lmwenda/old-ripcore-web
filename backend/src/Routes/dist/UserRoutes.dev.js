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

var _ValidateUpdatedUser2 = _interopRequireDefault(require("../Auth/ValidateUpdatedUser.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Exported Components
// Initializations
_dotenv["default"].config();

var router = _express["default"].Router(); // Logging in with Discord
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
            password: hashedPassword,
            username: req.body.username,
            membership: req.body.membership,
            isAdmin: false
          }); // Saving the User

          _context.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          savedUser = _context.sent;
          res.json(savedUser);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Verifing the User

router.post("/verify", function (req, res) {
  try {
    var token = req.header("verification-token");

    var decode = _jsonwebtoken["default"].verify(token, process.env.SECRET_TOKEN);

    return res.status(200).send(decode);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.put("/setadmin/:id", function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findById(req.params.id));

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_User["default"].updateOne(user, {
            isAdmin: req.body.isAdmin
          }).then(res.status(200).send({
            status: "Success",
            user: user.name
          })));

        case 6:
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // LOGIN ROUTE

router.post("/login", function _callee3(req, res) {
  var user, validPassword, token;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: req.body.email
          }));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).send("Invalid Email or Password."));

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(req.body.password, user.password));

        case 8:
          validPassword = _context3.sent;

          if (validPassword) {
            _context3.next = 12;
            break;
          }

          console.log("Invalid Email or Password");
          return _context3.abrupt("return", res.status(400).send("Invalid Email or Password."));

        case 12:
          // CREATING AND ASSIGNING A JWT TOKEN
          token = _jsonwebtoken["default"].sign({
            _id: user._id
          }, process.env.SECRET_TOKEN, {
            expiresIn: "7 days"
          });
          res.header("user-id", user._id);
          res.header("verification-token", token);
          res.status(200).send("Welcome back, " + user.username);
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          res.status(400).send(_context3.t0);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 18]]);
}); // Deleting the User

router["delete"]("/delete/user/:id", function (req, res) {
  _User["default"].findByIdAndDelete(req.params.id, function (err, user) {
    if (!err) {
      res.json({
        title: "Deleted User",
        user: user
      });
    } else {
      res.json(err);
    }
  });
}); // Getting a Specific User

router.get("/user/:id", function (req, res) {
  _User["default"].findById(req.params.id, function (err, user) {
    if (!err) {
      res.json(user);
    } else {
      res.json(err);
    }
  });
}); // Updating User Account Details

router.put("/me/:id", function _callee4(req, res) {
  var user, _ValidateUpdatedUser, error, emailExists, salt, hashedPassword;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = _User["default"].findById(req.params.id); // VALIDATING OUR USER

          _ValidateUpdatedUser = (0, _ValidateUpdatedUser2["default"])(req.body), error = _ValidateUpdatedUser.error;

          if (!error) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(400).send(error.details[0].message));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(_User["default"].findOne({
            email: req.body.email
          }));

        case 6:
          emailExists = _context4.sent;

          if (!emailExists) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(400).send("Email Already Exists."));

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

        case 11:
          salt = _context4.sent;
          _context4.next = 14;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(req.body.password, salt));

        case 14:
          hashedPassword = _context4.sent;

          // UPDATING THE USER
          _User["default"].updateOne(user, {
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword
          }).then(console.log("Updated Account.")).then(res.status(200).send("Updated Account."))["catch"](function (err) {
            return res.status(400).send(err);
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.post("/seed", function _callee5(req, res) {
  var pw, salt, hashedPassword, admin;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          pw = req.header("admin");

          if (!(pw === "ripcoreadmin")) {
            _context5.next = 14;
            break;
          }

          _context5.next = 4;
          return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

        case 4:
          salt = _context5.sent;
          _context5.next = 7;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash("ripcoreadmin", salt));

        case 7:
          hashedPassword = _context5.sent;
          admin = new _User["default"]({
            email: "admin@ripcore.com",
            password: hashedPassword,
            username: "admin",
            membership: "free",
            isAdmin: true
          });
          _context5.next = 11;
          return regeneratorRuntime.awrap(admin.save());

        case 11:
          res.status(200).send("Seeder created");
          _context5.next = 15;
          break;

        case 14:
          res.status(401).send("Unauthorized Access");

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;