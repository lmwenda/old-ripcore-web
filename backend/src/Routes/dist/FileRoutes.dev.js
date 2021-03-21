"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _File = _interopRequireDefault(require("../Models/File.js"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Initializations
var router = _express["default"].Router();

router.post("/upload", function _callee(req, res) {
  var packFile, uploadPath, file;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(!req.files || Object.keys(req.files).length === 0)) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Error uploading the file"));

        case 2:
          packFile = req.files.packFile;
          uploadPath = process.cwd() + "/src/pack_uploads/" + packFile.name;

          if (!(_path["default"].extname(packFile.name) !== ".pack")) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Invalid File"));

        case 6:
          packFile.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
          });
          file = new _File["default"]({
            name: _path["default"].basename(packFile.name, ".pack"),
            url: uploadPath,
            access: req.body.access
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(file.save());

        case 10:
          return _context.abrupt("return", res.status(200).send("Pack Uploaded Successfully!"));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _File["default"].find(function (err, file) {
            if (err) return res.status(400).send(err);
            return res.status(200).send(file);
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post("/download/:pack", function _callee3(req, res) {
  var file;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_File["default"].findOne({
            name: req.params.pack
          }));

        case 2:
          file = _context3.sent;

          if (file) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(404).send("No such packs!"));

        case 5:
          res.download(file.url, function (err) {
            if (err) return res.status(500).send("Error Downloading File!");
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Exporting Router

var _default = router;
exports["default"] = _default;