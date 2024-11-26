"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

const ProductDetails = ({ params }) => {
    const [id, setId] = useState(null);

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        };

        getId();
    }, [params]);

    const [product, setProduct] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/new-in-store/${id}`);

                const data = await response.json();

                console.log("fetchProduct data", data);
                setProduct(data);
            } catch (err) {
                // setError(err.message);
                // } finally {
                //     setLoading(false);

                console.log(`error pages/new-in-store/id: ${err}`);
            }
        };

        fetchProduct();
    }, [id]);

    // if (loading) {
    //     return <div className="loading">Lädt...</div>;
    // }

    // if (error) {
    //     return <div className="error">{error}</div>;
    // }

    // if (!product) {
    //     return <div>Produkt nicht gefunden.</div>;
    // }

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
                            <strong>Preis:</strong> {product.price} €
                        </p>
                        <p>
                            <strong>Verfügbar:</strong>{" "}
                            {product.available ? "Ja" : "Nein"}
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
                        <button className="buy-button">Warenkorb</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
