import UsedItem from "@/models/UsedItem";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        // const { _id } = req.params;

        const { id } = params;

        console.log('id', id);

        const product = await UsedItem.findOne({ _id: id })
            .populate('main_picture');

        return NextResponse.json({ message: 'Here is the used item!', success: 1, product });
        return;

    } catch (err) {
        console.log('Error on GET /used-item/:id', err);
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });
        return;
    }
};
