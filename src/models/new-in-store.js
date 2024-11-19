import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        hersteller: { type: String, required: true },
        modell: { type: String, required: true },
        preis: { type: Number, required: true },
        // image: { type: String, required: true }, // URL zum Produktbild
    },
    { timestamps: true }
);

export default mongoose.models.Product ||
    mongoose.model("Product", productSchema);
