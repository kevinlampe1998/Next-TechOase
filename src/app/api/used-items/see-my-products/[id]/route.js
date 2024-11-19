import { NextResponse } from "next/server";
import UsedItem from "@/models/UsedItem";
import Image from "@/models/Image";

export const GET = async (req, { params }) => {
    try {
        const { id } = await params;

        console.log(id);

        if (!id) {
            console.log('_id not found!');
            return NextResponse.json({ message: '_id not found!', error: true });
        }
        
        const foundUsedItems = await UsedItem.find({ user_who_sells: id });
        const usedItems = await UsedItem.populate(foundUsedItems, { path: 'main_picture', model: 'Image' });

        if (!usedItems) {
            console.log('usedItems not found!');
            return NextResponse.json({ message: 'usedItems not found!', error: true });
        }
        console.log('till here it works');

        return NextResponse.json({ message: 'Here are your products!', usedItems });

    } catch (err) {
        console.log('Error on GET /used-items/see-my-products/:_id');
        return NextResponse.json({ message: 'Something went wrong!' });
    }
};

export const PATCH = async (req) => {
    try {

        return NextResponse.json({ message: 'Your deal is updated!' });

    } catch (err) {
        console.log('Error on PATCH /used-items/see-my-products');
        return NextResponse.json({ message: 'Something went wrong!' });
    }
};