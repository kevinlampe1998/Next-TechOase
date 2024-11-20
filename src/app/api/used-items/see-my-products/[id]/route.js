import { NextResponse } from "next/server";
import UsedItem from "@/models/UsedItem";
import Image from "@/models/Image";

export const GET = async (req, { params }) => {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ message: '_id not found!', error: true });
        }
        
        const foundUsedItems = await UsedItem.find({ user_who_sells: id })
            .sort({ createdAt: -1 });
        const usedItems = await UsedItem.populate(foundUsedItems, { path: 'main_picture', model: 'Image' });

        if (!usedItems) {
            return NextResponse.json({ message: 'usedItems not found!', error: true });
        }

        return NextResponse.json({ message: 'Here are your products!', usedItems });

    } catch (err) {
        console.log('Error on GET /used-items/see-my-products/:_id');
        return NextResponse.json({ message: 'Something went wrong!' });
    }
};

export const DELETE = async (req, { params }) => {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ message: '_id not found!', error: true });
        }

        console.log('id', id);

        const deletedDeal = await UsedItem.deleteOne({ _id: id });
        console.log(deletedDeal);

        return NextResponse.json({ message: 'Your Deal is successful deleted!', success: true });

    } catch(err) {
        console.log('Error on DELETE /used-items/see-my-products/:_id');
        return NextResponse.json({ message: 'Something went wrong!' });
    }
};