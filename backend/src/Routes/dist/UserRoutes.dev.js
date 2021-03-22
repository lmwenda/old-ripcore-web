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
          console.log({
            user: savedUser
          });
          res.json(savedUser); // Redirecting the User

          res.redirect("/login");

        case 21:
        case "end":
          return _context.stop();
      }
    }
  });
}); // Verifing the User

function VerificationToken(req, res, next) {
  var token = req.headers['verification-token'];
  if (!token) return res.status(400).send("Invalid Access Token.");

  try {
    var verified = _jsonwebtoken["default"].verify(token, process.env.SECRET_TOKEN)["catch"](function (err) {
      if (err) return res.json({
        auth: false,
        msg: 'You Failed the Authentication Process'
      });
    });

    req.user = verified;
    req.userID = decoded.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token:", err);
  }
}

router.get("/verify-account", VerificationToken, function (req, res) {
  console.log("Sucessfully Verified Account");
  res.json({
    title: 'Completed Authentication Process',
    message: 'Sucessfully Verified Account'
  });
  res.redirect("http://localhost:3000/login"); // try {
  //   const token = req.header("auth-token");
  //   const decode = jwt.decode(token);
  //   return res.status(200).send(decode);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
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
            _context2.next = 12;
            break;
          }

          console.log("Invalid Email or Password");
          return _context2.abrupt("return", res.status(400).send("Invalid Email or Password."));

        case 12:
          // CREATING AND ASSIGNING A JWT TOKEN
          token = _jsonwebtoken["default"].sign({
            _id: user._id
          }, process.env.SECRET_TOKEN, {
            expiresIn: '7 days'
          }, function (err, token) {
            res.json({
              token: token
            });
          });
          res.header("verification-token", token);
          res.status(200).send("Welcome back, " + user.username);
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          res.status(400).send(_context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
}); // Deleting the User

router["delete"]("/delete/user/:id", function (req, res) {
  _User["default"].findByIdAndDelete(req.params.id, function (err, user) {
    if (!err) {
      res.json({
        title: 'Deleted User',
        user: user
      });
    } else {
      res.json(err);
    }
  });

  res.send("Deleted User");
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

router.put("/me/:id", function (req, res) {
  var user = _User["default"].findById(req.params.id);

  _User["default"].updateOne(user, req.body).then(console.log("Updated Account.")).then(res.send("Updated Account."));
});
var _default = router;
exports["default"] = _default;