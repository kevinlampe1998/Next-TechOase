import connectMongo from "@/lib/connectMongo";
import Computer from "@/models/new-in-store/Computer";
import { NextResponse } from "next/server";
import Image from "@/models/Image";

export const GET = async (req, { params }) => {
    try {
        connectMongo();
        const { id } = params;
        const foundComputer = await Computer.findOne({ _id: id });

        const computer = await Computer.populate(foundComputer, {
            path: "main_picture",
            model: "Image",
        });

        return NextResponse.json(computer);
    } catch (error) {
        console.log("Error on GET /api/new-in-store/product/:id");
        return NextResponse.json({
            message: "Something went wrong!",
            error: 1,
        });
    }
};
