import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        filePath: String,
    },
    {
        timestamps: true,
    }
);

const Image = mongoose.model('Image', ImageSchema);
export default Image;