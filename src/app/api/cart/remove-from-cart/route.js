import { NextResponse } from "next/server";
import Cart from "@/models/Cart";

export const POST = async (req) => {
    try {
        const body = await req.json();

        console.log(body);

        const { userId, productId } = await body;

        const cart = await Cart.findOne({ userId });
        console.log(cart);

        // const updatedProducts = cart.products.filter((product) => {
        //     console.log('product._id', product._id);
        //     console.log('productId', productId);
        //     console.log('String(product.productId) === productId', String(product.productId) === productId);
        //     if (String(product.productId) === productId) {
        //         return false;
        //     } else {
        //         return true
        //     }
        // });

        const result = await Cart.findOneAndUpdate(
            { userId: userId },
            { $pull: { products: { productId: productId } } },
            { new: true }
        );

        if (result) {
            return NextResponse.json({ message: 'Your product is successful removed from your cart!', success: 1 });
        } else {
            return NextResponse.json({ message: 'Something went wrong!', error: 1 });
        }

        return NextResponse.json({ message: 'Your product is successful removed from your cart!', success: 1 });

    } catch(err) {
        console.log('Error on route /api/cart/remove-from-cart', err);
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });
    }
};