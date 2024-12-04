import mongoose from "mongoose";
import Computer from "./Computer";
import Image from "../Image";

const ComputerOtherPicsSchema = new mongoose.Schema({
    computerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Computer' },
    otherPics: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Image'
    }]
}, { collection: 'ComputerOtherPics', timestamps: true });

export default mongoose.models.ComputerOtherPics || mongoose.model('ComputerOtherPics', ComputerOtherPicsSchema);