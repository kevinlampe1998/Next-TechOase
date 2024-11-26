import mongoose from "mongoose";
import User from "../User";
import Computers from "./Computer";

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                category: {
                    type: String,
                    enum: [
                        "Computer",
                        "Electronics",
                        "Clothing",
                        "Books",
                        "Other",
                    ],
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
