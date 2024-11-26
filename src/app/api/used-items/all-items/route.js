import { NextResponse } from "next/server";
import UsedItem from "@/models/UsedItem";
import connectMongo from "@/lib/connectMongo";
import Image from "@/models/Image";

export const GET = async () => {
    try {
        connectMongo();

        const foundProducts = await UsedItem.find();
        const populatedProducts = await UsedItem.populate(foundProducts, {
            path: 'main_picture', model: 'Image'
        });
        const products = populatedProducts.sort(() => Math.random() - 0.5);

        return NextResponse.json({ message: 'Here are all user deals!', success: 1, products });

    } catch(err) {
        console.log('Error on Route /api/used-items/all-items: ', err);
        console.log('Error on Route /api/used-items/all-items: ');
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });
    }
};