"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _crypto = _interopRequireDefault(require("crypto"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _multerGridfsStorage = _interopRequireDefault(require("multer-gridfs-storage"));

var _gridfsStream = _interopRequireDefault(require("gridfs-stream"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Initializations
var router = _express["default"].Router(); // Routes
// Init gfs


var gfs;

var conn = _mongoose["default"].createConnection(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

conn.once("open", function () {
  // Init stream
  gfs = (0, _gridfsStream["default"])(conn.db, _mongoose["default"].mongo);
  gfs.collection("uploads");
}); // Create storage engine

var storage = new _multerGridfsStorage["default"]({
  url: process.env.DB_CONNECTION,
  file: function file(req, _file) {
    return new Promise(function (resolve, reject) {
      _crypto["default"].randomBytes(16, function (err, buf) {
        if (err) {
          return reject(err);
        }

        var filename = buf.toString("hex") + path.extname(_file.originalname);
        var fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
var upload = (0, _multer["default"])({
  storage: storage
}); // @route GET /
// @desc Loads form

router.get("/", function (req, res) {
  gfs.files.find().toArray(function (err, files) {
    // Check if files
    res.send({
      files: files
    });
  });
}); // @route POST /upload
// @desc  Uploads file to DB

router.post("/upload", upload.single("file"), function (req, res) {
  // res.json({ file: req.file });
  res.status(200).send(req.file);
}); // @route GET /files
// @desc  Display all files in JSON

router.get("/files", function (req, res) {
  gfs.files.find().toArray(function (err, files) {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    } // Files exist


    return res.json(files);
  });
}); // @route GET /files/:filename
// @desc  Display single file object

router.get("/files/:filename", function (req, res) {
  gfs.files.findOne({
    filename: req.params.filename
  }, function (err, file) {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    } // File exists


    return res.json(file);
  });
}); // @route GET /image/:filename
// @desc Display Image

router.get("/image/:filename", function (req, res) {
  gfs.files.findOne({
    filename: req.params.filename
  }, function (err, file) {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    } // Check if image


    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      var readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
}); // @route DELETE /files/:id
// @desc  Delete file

router["delete"]("/files/:id", function (req, res) {
  gfs.remove({
    _id: req.params.id,
    root: "uploads"
  }, function (err, gridStore) {
    if (err) {
      return res.status(404).json({
        err: err
      });
    }

    res.redirect("/");
  });
}); // Exporting Router

var _default = router;
exports["default"] = _default;