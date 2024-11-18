import { NextResponse } from "next/server";
import UsedItem from "@/models/UsedItem";

export const GET = async (req, { params }) => {
    try {
        const { id } = await params;
        if (!id) {
            console.log('_id not found!');
            return NextResponse.json({ message: '_id not found!', error: true });
        }

        const usedItems = await UsedItem.find({ user_who_sells: id }).populate('main_picture');
        if (!usedItems) {
            console.log('usedItems not found!');
            return NextResponse.json({ message: 'usedItems not found!', error: true });
        }

        return NextResponse.json({ message: 'Here are your products!', usedItems });

    } catch (err) {
        console.log('Error on POST /used-items/get-my-products/:_id');
        return NextResponse.json({ message: 'Something went wrong!' });
    }
};