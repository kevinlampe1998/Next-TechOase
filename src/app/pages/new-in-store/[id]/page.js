"use client";

import { useState, useEffect, useContext } from "react";
import styles from "./page.module.css";
import { TheContext } from "@/components/context-provider/component";

const ProductDetails = ({ params }) => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const [id, setId] = useState(null);

    const [product, setProduct] = useState(null);

    // const [payload, setPayload] = useState({
    //     userId: localDataBank.user._id,
    //     productId: id,
    //     category: "Computer",
    // });

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        getId();
    }, [params]);

    const addToCart = async () => {
        console.log({
            userId: localDataBank.user._id,
            productId: id,
            category: "Computer",
        });
        const response = await fetch(`/api/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: localDataBank.user._id,
                productId: id,
                category: "Computer",
            }),
        });
        const data = await response.json();

        console.log("addToCart data", data);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/new-in-store/${id}`);

                const data = await response.json();

                console.log("fetchProduct data", data);
                setProduct(data);
            } catch (err) {
                console.log(`error pages/new-in-store/id: ${err}`);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div className={styles.productDetail}>
            <h1>Product Details</h1>
            <div className={styles.card}>
                {product && (
                    <div>
                        <h1>
                            {product.manufacturer} - {product.model}
                        </h1>
                        {product.main_picture && (
                            <img
                                src={product?.main_picture?.url}
                                alt={`${product.model}`}
                                className="product-image"
                            />
                        )}
                        <p>
                            <strong>Price:</strong> {product.price} €
                        </p>
                        <p>
                            <strong>Available:</strong>{" "}
                            {product.available ? "Yes" : "No"}
                        </p>
                        <p>
                            <strong>Details:</strong>
                        </p>
                        <ul>
                            {Object.entries(product).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong>{" "}
                                    {JSON.stringify(value)}
                                </li>
                            ))}
                        </ul>
                        <button onClick={addToCart} className="buy-button">
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
