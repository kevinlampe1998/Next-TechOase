import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);