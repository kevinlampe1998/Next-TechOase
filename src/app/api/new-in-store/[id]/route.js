import connectMongo from "@/lib/connectMongo";
import Computer from "@/models/new-in-store/Computer";
import { NextResponse } from "next/server";
import Image from "@/models/Image";

export const GET = async (req, { params }) => {
    try {
        console.log('GET /api/new-in-store/:id route is requested!');
        connectMongo();
        const { id } = await params;
        console.log('id', id);
        const foundComputer = await Computer.findOne({ _id: id });
        console.log('foundComputer', foundComputer);

        const computer = await Computer.populate(foundComputer, {
            path: "main_picture",
            model: "Image",
        });
        console.log('computer', computer);

        return NextResponse.json(computer);
    } catch (error) {
        console.log("Error on GET /api/new-in-store/:id");
        return NextResponse.json({
            message: "Something went wrong!",
            error: 1,
        });
    }
};
