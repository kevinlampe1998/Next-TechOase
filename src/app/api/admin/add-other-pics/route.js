import { NextResponse } from "next/server";
import ComputerOtherPics from "@/models/new-in-store/ComputerOtherPics";

export const POST = async (req) => {
    try {

        const body = await req.json();

        console.log('body in post /add-other-pics', body);
        const { computerId, imageId } = body;

        const foundDoc = await ComputerOtherPics.findOne({ computerId });

        if (!foundDoc) {
            console.log('Doc not found, so we have to create one!');

            const newDoc = await new ComputerOtherPics({ computerId, otherPics: [imageId] });

            console.log('newDoc', newDoc);

            const saveDoc = await newDoc.save();

            return NextResponse.json({ message: 'New computerOtherPics doc is created and Image successful added!', success: 1 });

        }

        foundDoc && console.log('Doc found!');

        console.log(foundDoc);

        if (foundDoc.otherPics.length > 8) {
            return NextResponse.json({ message: 'Your pic set size already reached!', success: 1, maxSize: 1 });
        }

        const updatedDoc = await ComputerOtherPics.updateOne({ computerId },
            { $push: { otherPics: imageId } });

        console.log('updatedDoc', updatedDoc);
        console.log('foundDoc.otherPics.length', foundDoc.otherPics.length);

        return NextResponse.json({ message: 'Your other image is added to the pic list!', success: 1 });

    } catch (err) {
        console.log('Error on Route POST /api/admin/add-other-pics', err,
            'Error on Route POST /api/admin/add-other-pics');
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });
    }
};