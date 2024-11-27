"use client";

import { useState, useEffect, useContext, useRef } from "react";
import styles from "./page.module.css";
import { TheContext } from "@/components/context-provider/component";

const ProductDetails = ({ params }) => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const [ id, setId ] = useState(null);
    const [ product, setProduct ] = useState(null);
    const cartMessage = useRef();

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

        
        cartMessage.current.innerHTML = data.message;

        data.success && (cartMessage.current.style.color = 'green');
        data.alreadyExist && (cartMessage.current.style.color = 'black');
        data.error && (cartMessage.current.style.color = 'red');
        
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

    useEffect(() => {
        // console.log(product);
        product && console.log(Object.keys(product));
    }, [product]);

    return (
        <div className={styles.productDetail}>
            <h1>Product Details</h1>
            <div className={styles.card}>
                {product ? (
                    <div>
                        <h2>
                            {product.manufacturer} - {product.model}
                        </h2>
                        {product.main_picture && (
                            <img
                                src={product?.main_picture?.url}
                                alt={`${product.model}`}
                                className="product-image"
                            />
                        )}
                        <div>
                            <h3>Price</h3>
                            <span>{product.price} €</span>
                        </div>
                        <div>
                            <h3>Available</h3>{" "}
                            <span>{product.available ? "Yes" : "No"}</span>
                        </div>
                        <div>
                            <h3>Details</h3>
                        </div>
                        {/* <ul> */}
                            {/* {Object.entries(product).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong>{" "}
                                    {JSON.stringify(value)}
                                </li>
                            ))} */}
                                
                        {/* </ul> */}
                        <div>
                            <h3>Processor</h3>

                            <h4>Name</h4>
                            <span>{product?.specifications?.processor?.name}</span>

                            <h4>Cores</h4>
                            <span>{product?.specifications?.processor?.cores}</span>
                        </div>
                        <div>
                            <h3>Memory</h3>

                            <h4>Size</h4>
                            <span>{product?.specifications?.memory?.size}</span>

                            <h4>Type</h4>
                            <span>{product?.specifications?.memory?.type}</span>

                            <h4>Speed</h4>
                            <span>{product?.specifications?.memory?.speed}</span>
                        </div>

                        <div>
                            <h3>Display</h3>

                            <h4>Size</h4>
                            <span>{product?.specifications?.display?.size}</span>

                            <h4>Resolution</h4>
                            <span>{product?.specifications?.display?.resolution}</span>

                            <h4>Type</h4>
                            <span>{product?.specifications?.display?.type}</span>

                            <h4>Touchscreen</h4>
                            <span>{product?.specifications?.display?.touchscreen ? 'Yes' : 'No'}</span>
                        </div>

                        <div>
                            <h3>Graphics</h3>

                            <h4>Name</h4>
                            <span>{product?.specifications?.graphics?.name}</span>

                            <h4>VRAM</h4>
                            <span>{product?.specifications?.graphics?.vram}</span>
                        </div>

                        <div>
                            <h3>Storage</h3>

                            <h4>Type</h4>
                            <span>{product?.specifications?.storage?.type}</span>

                            <h4>Capacity</h4>
                            <span>{product?.specifications?.storage?.capacity}</span>
                        </div>

                        <div>
                            <h3>Battery</h3>

                            <h4>Capacity</h4>
                            <span>{product?.specifications?.battery?.capacity}</span>

                            <h4>Runtime</h4>
                            <span>{product?.specifications?.battery?.runtime}</span>
                        </div>

                        <button onClick={addToCart} className="buy-button">
                            Add to Cart
                        </button>

                        <h5 ref={cartMessage}></h5>
                    </div>
                ) : <div>... loading</div>}
            </div>
        </div>
    );
};

export default ProductDetails;
