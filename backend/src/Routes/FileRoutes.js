import express from "express";
import File from "../Models/File.js";
import path from "path";

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

  packFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
  });
  const file = new File({
    name: path.basename(packFile.name, ".pack"),
    url: uploadPath,
    access: req.body.access,
  });
  await file.save();
  return res.status(200).send("Pack Uploaded Successfully!");
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

// Exporting Router
export default router;
