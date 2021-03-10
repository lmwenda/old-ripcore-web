"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _app = require("../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Initializations
var router = _express["default"].Router(); // Routes
// Init gfs


var gfs;

_app.conn.once('open', function () {
  // Init stream
  gfs = Grid(_app.conn.db, mongoose.mongo);
  gfs.collection('uploads');
}); // Create storage engine


var storage = new GridFsStorage({
  file: function file(req, _file) {
    return new Promise(function (resolve, reject) {
      crypto.randomBytes(16, function (err, buf) {
        if (err) {
          return reject(err);
        }

        var filename = buf.toString('hex') + path.extname(_file.originalname);
        var fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
var upload = multer({
  storage: storage
}); // @route GET /
// @desc Loads form

router.get('/', function (req, res) {
  gfs.files.find().toArray(function (err, files) {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', {
        files: false
      });
    } else {
      files.map(function (file) {
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', {
        files: files
      });
    }
  });
}); // @route POST /upload
// @desc  Uploads file to DB

router.post('/upload', upload.single('file'), function (req, res) {
  // res.json({ file: req.file });
  res.redirect('/');
}); // @route GET /files
// @desc  Display all files in JSON

router.get('/files', function (req, res) {
  gfs.files.find().toArray(function (err, files) {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    } // Files exist


    return res.json(files);
  });
}); // @route GET /files/:filename
// @desc  Display single file object

router.get('/files/:filename', function (req, res) {
  gfs.files.findOne({
    filename: req.params.filename
  }, function (err, file) {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    } // File exists


    return res.json(file);
  });
}); // @route GET /image/:filename
// @desc Display Image

router.get('/image/:filename', function (req, res) {
  gfs.files.findOne({
    filename: req.params.filename
  }, function (err, file) {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    } // Check if image


    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      var readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
}); // @route DELETE /files/:id
// @desc  Delete file

router["delete"]('/files/:id', function (req, res) {
  gfs.remove({
    _id: req.params.id,
    root: 'uploads'
  }, function (err, gridStore) {
    if (err) {
      return res.status(404).json({
        err: err
      });
    }

    res.redirect('/');
  });
}); // Exporting Router

var _default = router;
exports["default"] = _default;