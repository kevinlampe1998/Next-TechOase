import mongoose from "mongoose";
import User from "./User";
import Computers from "./new-in-store/Computer";

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
                        "Mobile",
                        "Raspberry",
                        "Drones",
                        "ThreeDPrinter",
                        "UsedItem",
                    ],
                },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
