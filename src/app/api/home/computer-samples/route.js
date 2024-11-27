import { NextResponse } from "next/server";
import Computer from "@/models/new-in-store/Computer";
import Image from "@/models/Image";
import { Copy } from "lucide-react";

export const GET = async () => {
    try {

        const aggregatedComputers = await Computer.aggregate([ { $sample: { size: 10 } } ]);

        const computers = await Computer.populate(aggregatedComputers, {
            path: 'main_picture', model: 'Image'
        });

        return NextResponse.json({ message: 'Here are your computers!', success: 1, computers });

    } catch(err) {
        console.log('Error on Route /api/home/computer-samples', err,
            'Error on Route /api/home/computer-samples');
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });
    }
};