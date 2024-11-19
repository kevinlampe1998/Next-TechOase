// import Product from "@/models/new-in-store";
import connectMongo from "@/lib/connectMongo";
import { NextResponse } from "next/server";

export default async function GET(req, res) {
    //     if (req.method === "GET") {
    //         try {
    //             // Verbindung zur MongoDB herstellen
    //             await connectMongo();
    //             // Produkte abrufen
    //             const products = await Product.find({});
    //             return NextResponse.json(products);
    //         } catch (error) {
    //             return NextResponse.json({
    //                 message: "Error fetching products",
    //                 error,
    //             });
    //         }
    //     } else {
    //         return NextResponse.json({ message: "Method not allowed" });
    //     }
}
