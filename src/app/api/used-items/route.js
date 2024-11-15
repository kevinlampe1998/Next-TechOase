import UsedItem from '@/models/UsedItem.js';
import Image from '@/models/Image';

import { NextResponse } from 'next/server';

export const GET = async (req, res) => {
    try {
        console.log('/used-items route is requested');

        // const aggregateProducts = await UsedItem.aggregate([{ $sample: { size: 10 } }]);
        const aggregateProducts = await UsedItem.aggregate([
            // { $match: { main_picture: { $ne: null } } },
            { $sample: { size: 10 } }
        ]);

        if (!aggregateProducts) 
            return NextResponse.json({ message: 'No aggregatedProducts found!', error: 1 });

        const products = await UsedItem.populate(aggregateProducts, { path: 'main_picture', model: 'Image' });

        if (!products)
            return NextResponse.json({ message: 'No products found!', error: 1 });
        
        return NextResponse.json({ message: 'Here are the products!', products });

    } catch (err) {
        console.log('Error on GET /used-items');
        return NextResponse.json({ message: 'Something went wrong!' });
    }
};