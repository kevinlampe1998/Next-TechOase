import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const collection = db.collection("products");

    switch (req.method) {
        case "GET":
            const products = await collection.find({}).toArray();
            res.status(200).json(products);
            break;
        case "POST":
            const newProduct = req.body;
            await collection.insertOne(newProduct);
            res.status(201).json({ message: "Product added successfully" });
            break;
        case "PUT":
            const { _id, ...updateData } = req.body;
            await collection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: updateData }
            );
            res.status(200).json({ message: "Product updated successfully" });
            break;
        case "DELETE":
            const { id } = req.body;
            await collection.deleteOne({ _id: new ObjectId(id) });
            res.status(200).json({ message: "Product deleted successfully" });
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
    }
}
