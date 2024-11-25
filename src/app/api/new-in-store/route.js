import Computer from "@/models/new-in-store/Computer";
import connectMongo from "@/lib/connectMongo";
import { NextResponse } from "next/server";
import Image from "@/models/Image";

export const POST = async (req, res) => {
    try {
        connectMongo();

        const body = await req.json();
        console.log("body", body);

        const newComputer = new Computer(body);
        console.log("newComputer", newComputer);

        const savedComputer = await newComputer.save();
        console.log("savedComputer", savedComputer);

        return NextResponse.json({
            message: "your laptop is successful saved!",
            success: 1,
        });
    } catch (error) {
        console.log("Error on POST /api/new-in-store");
        return NextResponse.json({
            message: "Something went wrong!",
            error: 1,
        });
    }
};
