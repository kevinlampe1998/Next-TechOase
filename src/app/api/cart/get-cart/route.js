import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import Computer from "@/models/new-in-store/Computer";

export async function POST(req) {
    try {
        const body = await req.json();

        const { userId } = body;

        const cart = await Cart.findOne({ userId });

        if (cart) {
            return NextResponse.json({
                message: "Cart fetched successfully",
                cart,
            });
        }
        return NextResponse.json({
            message: "Cart not found",
            error: 1,
        });
    } catch (error) {
        console.log("error on Route /api/cart", error);
        return NextResponse.json({
            message: "Internal Server Error",
            error: 1,
        });
    }
}
