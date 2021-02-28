import mongoose from "mongoose";

const CodeSchema = mongoose.Schema({
    code: {
        type: String,
        min: 4
    }
})

const Code = mongoose.model('Verification-Code', CodeSchema);
export default Code;