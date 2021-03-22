import express from "express";
import File from "../Models/File.js";
import path from "path";
import fs from "fs";

// Initializations

const router = express.Router();

router.post("/upload", async (req, res) => {
  let packFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("Error uploading the file");
  }

  packFile = req.files.packFile;
  uploadPath = process.cwd() + "/src/pack_uploads/" + packFile.name;

  if (path.extname(packFile.name) !== ".pack")
    return res.status(400).send("Invalid File");

  // console.log(packFile);
  const check = File.findOne({ name: packFile.name });
  if (!check) {
    const file = new File({
      name: path.basename(packFile.name, ".pack"),
      url: uploadPath,
      access: req.body.access,
    });
    packFile.mv(uploadPath, (err) => {
      if (err) return res.status(500).send(err);
    });
    await file.save();
    return res.status(200).send("Pack Uploaded Successfully!");
  } else {
    return res.status(400).send("File with that name already Created!");
  }
});

router.get("/", async (req, res) => {
  File.find((err, file) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(file);
  });
});

router.post("/download/:pack", async (req, res) => {
  const file = await File.findOne({ name: req.params.pack });
  if (!file) return res.status(404).send("No such packs!");
  res.download(file.url, (err) => {
    if (err) return res.status(500).send("Error Downloading File!");
  });
});

router.delete("/delete/:pack", async (req, res) => {
  File.findOneAndDelete({ name: req.params.pack }, (err, file) => {
    if (err) return res.status(400).send(err);
    let uploadPath = process.cwd() + "/src/pack_uploads/" + req.params.pack;
    fs.unlink(uploadPath, (err) => {
      if (err) throw err;
      console.log("DELETED");
    });
    return res.status(200).send("SUCCESS");
  });
});

// Exporting Router
export default router;
