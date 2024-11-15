import mongoose from "mongoose";

const personWhoWritesSchema = new mongoose.Schema({
    person_who_writes: String,
    message: String,
    date: { type: Date, default: Date.now }
}, { collection: 'personWhoWrites', timestamps: true });

export default mongoose.models.PersonWhoWrites || mongoose.model('PersonWhoWrites', personWhoWritesSchema);