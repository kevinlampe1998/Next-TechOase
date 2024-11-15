import mongoose from "mongoose";

const helpChatSchema = new mongoose.Schema({
    user_who_needs_help: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonWhoWrites'
    }]
}, { timestamps: true });

export default mongoose.models.HelpChat || mongoose.model('HelpChat', helpChatSchema);