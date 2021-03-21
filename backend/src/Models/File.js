import mongoose from "mongoose";

// File Schema

const FileSchema = mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  access: {
    type: Number,
  },
});

// Exporting the File Model

const File = mongoose.model("File", FileSchema);
export default File;