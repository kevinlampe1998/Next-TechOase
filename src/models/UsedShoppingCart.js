import mongoose from 'mongoose';

const UsedShoppingCartSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UsedItem' }]
}, { timestamps: true });

export default mongoose.models.UsedShoppingCart || mongoose.model('UsedShoppingCart', UsedShoppingCartSchema);