import { NextResponse } from "next/server";
import ComputerOtherPics from "@/models/new-in-store/ComputerOtherPics";

export const POST = async (req) => {
    try {

        const body = await req.json();

        const { computerId } = body;

        console.log('computerId', computerId);

        const deletedDoc = await ComputerOtherPics.deleteOne({ computerId });
        console.log(deletedDoc);

        return NextResponse.json({ message: 'All other pics are deleted!', success: 1 });

    } catch (err) {
        console.log('Error on route POST /api/admin/delete-other-pics', err,
            'Error on route POST /api/admin/delete-other-pics');
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });
    }
};