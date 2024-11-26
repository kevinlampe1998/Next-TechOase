"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { TheContext } from "@/components/context-provider";
import styles from "./styles.css";
// import { useParams, useNavigate } from "react-router-dom";

const Products = () => {
    // const [id, setId] = useState(null);

    // useEffect(() => {
    //     const getId = async () => {
    //         const resolvedParams = await params;
    //         setId(resolvedParams.id);
    //     };

    //     getId();
    // }, [params]);

    // useEffect(() => {
    //     id && fetchProducts();
    // }, [id]);

    // const { _id } = useParams();
    const [products, setProducts] = useState([]);
    const { localDataBank, dispatch } = useContext(TheContext);
    // const navi = useNavigate();

    const fetchProducts = async () => {
        const res = await fetch(`/api/new-in-store`);
        const data = await res.json();
        console.log("fetchProducts data", data);

        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log("products", products);
    });

    return (
        <div>
            <h1>Products</h1>

            {products &&
                products.map((product) => (
                    <div key={product._id}>
                        <h2>{product.model}</h2>

                        <img src={product?.main_picture?.url} />

                        <p>Manufacturer: {product.manufacturer}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "Detail Product",
                                    payload: product,
                                })
                            }
                        >
                            Product Details
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default Products;
