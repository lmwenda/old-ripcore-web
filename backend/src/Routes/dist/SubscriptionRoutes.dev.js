"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _uuid = _interopRequireDefault(require("uuid"));

var _Image = _interopRequireDefault(require("../Models/Image.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Initializations
var uuid = (0, _uuid["default"])();

var router = _express["default"].Router(); // Image Upload


var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function filename(req, file, cb) {
    var ext = _path["default"].extname(file.originalname);

    var id = uuid();
    var filePath = "images/".concat(id).concat(ext);

    _Image["default"].create({
      filePath: filePath
    }).then(function () {
      cb(null, filePath);
    });
  }
});

var upload = (0, _multer["default"])({
  storage: storage
}); // Uploading Images

app.post('/upload', upload.array('avatar'), function (req, res) {
  return res.redirect('/');
}); // Getting Images

router.get('/images', function (req, res) {
  _Image["default"].find().then(function (images) {
    return res.json({
      status: 'OK',
      images: images
    });
  });
}); // Exporting Router

var _default = router;
exports["default"] = _default;