"use client";

import { useContext, useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

import { TheContext } from "@/components/context-provider/component";

const Products = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const { localDataBank, dispatch } = useContext(TheContext);

    const fetchProducts = async () => {
        const res = await fetch('/api/new-in-store', {
            method: 'GET'
        });
        const data = await res.json();
        console.log("fetchProducts data", data);

        if (data.error) {
            return;
        }

        setProducts(data);

        
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={styles.NewInStore}>
            <h1>Products</h1>

            {products &&
                products.map((product) => (
                    <div className={styles.NewInStoreProduct} key={product._id}>
                        <h2>{product.model}</h2>

                        <img src={product?.main_picture?.url} />

                        <p>Manufacturer: {product.manufacturer}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button
                            onClick={() =>
                                router.push(
                                    `/pages/new-in-store/${product._id}`
                                )
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
