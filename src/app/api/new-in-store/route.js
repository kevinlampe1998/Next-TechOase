import Computer from "@/models/new-in-store/Computer";
import connectMongo from "@/lib/connectMongo";
import { NextResponse } from "next/server";
import Image from "@/models/Image";

export const POST = async (req, res) => {
    try {
        const body = await req.json();
        console.log("body", body);

        if (!body.manufacturer) {
            return NextResponse.json({
                message: "Manufacturer is required!",
                error: 1,
            });
        }

        if (!body.model) {
            return NextResponse.json({
                message: "Model is required!",
                error: 1,
            });
        }
        if (!body.price) {
            return NextResponse.json({
                message: "Price is required!",
                error: 1,
            });
        }
        if (!body.main_picture) {
            return NextResponse.json({
                message: "Main Picture is required!",
                error: 1,
            });
        }

        if (!body.specifications.processor.name) {
            return NextResponse.json({
                message: "processor.name is required!",
                error: 1,
            });
        }
        if (!body.specifications.processor.cores) {
            return NextResponse.json({
                message: "processor.cores is required!",
                error: 1,
            });
        }
        if (!body.specifications.memory.size) {
            return NextResponse.json({
                message: "memory.size is required!",
                error: 1,
            });
        }
        if (!body.specifications.memory.type) {
            return NextResponse.json({
                message: "memory.type is required!",
                error: 1,
            });
        }
        if (!body.specifications.memory.speed) {
            return NextResponse.json({
                message: "memory.speed is required!",
                error: 1,
            });
        }
        if (!body.specifications.storage.type) {
            return NextResponse.json({
                message: "storage.type is required!",
                error: 1,
            });
        }
        if (!body.specifications.storage.capacity) {
            return NextResponse.json({
                message: "storage.capacity is required!",
                error: 1,
            });
        }
        if (!body.specifications.graphics.name) {
            return NextResponse.json({
                message: "graphics.name is required!",
                error: 1,
            });
        }
        if (!body.specifications.graphics.vram) {
            return NextResponse.json({
                message: "graphics.vram is required!",
                error: 1,
            });
        }
        if (!body.specifications.display.size) {
            return NextResponse.json({
                message: "display.size is required!",
                error: 1,
            });
        }
        if (!body.specifications.display.resolution) {
            return NextResponse.json({
                message: "display.resolution is required!",
                error: 1,
            });
        }
        if (!body.specifications.display.type) {
            return NextResponse.json({
                message: "display.type is required!",
                error: 1,
            });
        }
        if (!body.specifications.display.touchscreen) {
            return NextResponse.json({
                message: "display.touchscreen is required!",
                error: 1,
            });
        }
        if (!body.specifications.battery.capacity) {
            return NextResponse.json({
                message: "battery.capacity is required!",
                error: 1,
            });
        }
        if (!body.specifications.battery.runtime) {
            return NextResponse.json({
                message: "battery.runtime is required!",
                error: 1,
            });
        }
        if (!body.weight) {
            return NextResponse.json({
                message: "weight is required!",
                error: 1,
            });
        }

        const newComputer = new Computer(body);
        console.log("newComputer", newComputer);

        const savedComputer = await newComputer.save();
        console.log("savedComputer", savedComputer);

        connectMongo();

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
