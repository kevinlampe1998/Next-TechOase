import { NextResponse } from "next/server";
import UsedItem from "@/models/UsedItem";
import Image from "@/models/Image";
import User from "@/models/User";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);

        const { 
            user_who_sells,
            seller_name,
            product_name,
            main_picture,
            description,
            price,
            condition,
            category,
            subcategory,
         } = body;

        console.log(body);

        if (!user_who_sells) console.log('user_who_sells is missing');
        if (!seller_name) console.log('seller_name is missing');
        if (!product_name) console.log('product_name is missing');
        if (!main_picture) console.log('main_picture is missing');
        if (!description) console.log('description is missing');
        if (!price) console.log('price is missing');
        if (!condition) console.log('condition is missing');
        if (!category) console.log('category is missing');
        if (!subcategory) console.log('subcategory is missing');

        if (
            !user_who_sells ||
            !seller_name ||
            !product_name ||
            !main_picture ||
            !description ||
            !price ||
            !condition ||
            !category ||
            !subcategory
        ) {
            return NextResponse.json({
                message: 'At least one input is missing!',
                error: true
            });
        }

        if (!seller_name) {
            return NextResponse.json({
                message: 'Internal error, referencing user to product!',
                error: true
            });
        }

        const nameExists = await UsedItem.findOne({ product_name });

        if (nameExists) {
            return NextResponse.json({
                message: 'Product name exists already!',
                error: true
            });
        }
        
        const newProduct = new UsedItem( body );
        if (!newProduct)
            return NextResponse.json({
                message: 'NewUsedItem creating error!',
                error: true
            });

        const savedProduct = await newProduct.save();
        if (!savedProduct)
            return NextResponse.json({
                message: 'NewUsedItem saving error!',
                error: true
            });

        const product = await UsedItem.findOne({ _id: savedProduct._id })
            .populate('main_picture');

        return NextResponse.json({
            message: 'Product successful saved!',
            success: true,
            product
        });

    } catch(err) {
        console.log('Error POST /api/set-product', err);
        return NextResponse.json({ error: 'Upload failed' });
    } 
}

export async function GET(req, res) {
    try {
        const aggregatedProducts = await UsedItem.aggregate([
            { $sample: { size: 10 } }
        ]);
        console.log('aggregatedProducts', aggregatedProducts);

        if (!aggregatedProducts) {
            return NextResponse.json({
                message: 'Aggregated products not found!',
                error: true
            });
        }

        const products = await UsedItem.populate(aggregatedProducts,
            [{ path: 'primary_image', model: 'Image' }, { path: 'seller', model: 'User' }]);

        if (!products) {
            return NextResponse.json({
                message: 'Error populating products!',
                error: true
            });
        }

        return NextResponse.json({
            message: 'Here are your some random products!',
            success: true, products
        });

    } catch(err) {
        console.log('Error POST /api/set-product', err);
        return NextResponse.json({ error: 'Something went wrong! GET /api/products' });
    }
}