"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { TheContext } from "@/components/context-provider/component";

const Products = ({ params }) => {
    const [id, setId] = useState(null);

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        getId();
    }, [params]);

    useEffect(() => {
        id && fetchProducts();
    }, [id]);

    // const { _id } = useParams();
    const [products, setProducts] = useState([]);
    // const { localDataBank, dispatch } = useContext(TheContext);
    // const navi = useNavigate();

    // const fetchProducts = async () => {
    //     const res = await fetch(`/api/new-in-store`);
    //     const data = await res.json();
    //     console.log("fetchProducts data", data);

    //     setProducts(data.products);
    // };
    return (
        <div>
            <h1>Products</h1>
        </div>
    );
};

export default Products;
