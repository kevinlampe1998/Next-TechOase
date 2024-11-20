import { NextResponse } from "next/server";
import UsedItem from "@/models/UsedItem";
import Image from "@/models/Image";

export const PATCH = async (req) => {
    try {
        const body = await req.json();
        const { id } = body;
        console.log('id in PATCH /api/used-items/see-my-products', id);
        console.log('body', body);

        const foundDeal = await UsedItem.findOne({ _id: id });
        console.log(foundDeal);

        const payload = {};

        for (let key in body) {
            // console.log(key);
            // console.log(body[key]);
            console.log(key === 'id');

            if (key === 'id') continue;

            if (body[key] === '' || !body[key]) {
                console.log(`${key}: ${body[key]}: true`);
                continue;
            }

            payload[key] = body[key]
            console.log(`${key}: ${body[key]}: false`);
        }

        console.log(payload);

        const patchedDeal = await UsedItem.updateOne({ _id: id },
            { $set: payload });
        console.log(patchedDeal);

        return NextResponse.json({ message: 'Your deal is updated!', success: true });

    } catch (err) {
        console.log('Error on PATCH /used-items/see-my-products');
        return NextResponse.json({ message: 'Something went wrong!' });
    }
};