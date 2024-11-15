import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    usedItem: { type: mongoose.Schema.Types.ObjectId, ref: 'UsedItem' },
    content: String
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model('Message', messageSchema);