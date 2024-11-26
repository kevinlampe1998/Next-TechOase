import { NextResponse } from "next/server";
import Cart from "@/models/Cart";

export async function POST(req, res) {
    try {
        const body = await req.json();

        const { userId, productId, category } = body;

        console.log("body", body);

        const cart = await Cart.findOne({ userId });
        if (cart) {
            const product = cart.products.find(
                (product) => product.productId === productId
            );
            if (product) {
                return NextResponse.json({
                    message: "Product already exists in the cart",
                });
            }
            cart.products.push({ productId, category });
            await cart.save();
            return NextResponse.json({
                message: "Product added to the cart",
            });
        }
        const newCart = new Cart({
            userId,
            products: [{ productId, category }],
        });
        await newCart.save();
        return NextResponse.json({
            message: "Product added to the cart",
            success: 1,
        });
    } catch (error) {
        console.log("error on Route /api/cart", error);
        return NextResponse.json({
            message: "Internal Server Error",
            error: 1,
        });
    }
}
