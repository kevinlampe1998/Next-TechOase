import { NextResponse } from "next/server";
import ComputerOtherPics from "@/models/new-in-store/ComputerOtherPics";
import Image from "@/models/Image";

export const POST = async (req) => {
    try {

        const body = await req.json();

        const { computerId } = body;

        console.log('computerId', computerId);

        const foundDoc = await ComputerOtherPics.findOne({ computerId });

        if (!foundDoc) {
            return NextResponse.json({ message: 'No OtherPicsDoc till now!', success: 1, noPics: 1 });
        }

        const otherPics = await ComputerOtherPics.populate(foundDoc, {
            path: 'otherPics', model: 'Image'
        });

        return NextResponse.json({ message: 'Here are your other pics of the computer!', success: 1, otherPics: otherPics.otherPics });

    } catch (err) {
        console.log('Error on Route POST /api/admin/get-other-pics', err,
            'Error on Route POST /api/admin/get-other-pics');
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });
    }
};