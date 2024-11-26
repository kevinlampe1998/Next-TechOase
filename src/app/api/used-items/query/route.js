import { NextResponse } from "next/server";
import UsedItem from "@/models/UsedItem";
import Image from "@/models/Image";

export const POST = async (req) => {
    try {
        const body = await req.json();
        console.log(body);
        console.log(body.category);

        const skipValue = body.page;

        const foundProducts = await UsedItem.find();

        const populatedProducts = await UsedItem.populate(foundProducts, { path: 'main_picture' });

        populatedProducts.reverse();

        const randomlyProducts = populatedProducts.sort(() => Math.random() - 0.5);

        const products = randomlyProducts.filter((product) => {

            const product_name = product.product_name.toUpperCase();
            const query = body.query.toUpperCase();
            
            const searchByQuery = () => {
                if (query !== '') {
                    if (product_name.includes(query)) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            };

            const searchByCategory = () => {

                // console.log(body.category);
                // console.log(product.category);

                if (body.category !== '') {
                    if (body.category === product.category) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            };

            const searchBySubcategory = () => {
                if (body.subcategory !== '') {
                    if (body.subcategory === product.subcategory) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            };

            return ( searchByQuery() && searchByCategory() && searchBySubcategory() ) ? true: false;
        });

        return NextResponse.json({ message: 'Here are your filtered user deals!', success: 1, products });

    } catch(err) {
        console.log('Error /api/used-items/query', err);
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });
    }
};