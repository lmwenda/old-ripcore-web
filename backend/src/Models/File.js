import mongoose from "mongoose";

// File Schema

const FileSchema = mongoose.Schema({
    
});

// Exporting the File Model

const File = mongoose.model('File', FileSchema);
export default File;