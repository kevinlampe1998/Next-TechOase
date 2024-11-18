"use client";

import { useEffect, useState, useContext } from "react";
import { TheContext } from "@/components/context-provider";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Products = () => {
    const router = useRouter();
    const [products, setProducts] = useState();
    const { localDataBank, dispatch } = useContext(TheContext);

    const getProducts = async () => {
        const res = await fetch("/api/used-items");
        const data = await res.json();
        console.log("getProducts data", data);

        // const idChanged = data.products.map(product =>
        //     ({ ...product, id: product._id }));

        setProducts(data.products);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const addToUsedShoppingCart = async (productId) => {
        const res = await fetch("/api/used-shopping-cart", {
            method: "POST",
            body: JSON.stringify({
                productId,
                userId: localDataBank.user._id,
            }),
            headers: { "content-type": "application/json" },
        });

        const data = await res.json();
    };

    return (
        <div className={styles.products}>
            <button onClick={() => router.push("/pages/set-used-item")}>
                Set product to sell
            </button>

            {products &&
                products.map((product) => (
                    <div key={product._id} className={styles.productContainer}>
                        <h4>{product.product_name}</h4>
                        <img
                            src={`${product?.main_picture?.url}`}
                            alt={`product ${product.product_name}`}
                        />

                        <div>
                            <div>
                                Seller:{" "}
                                {product.seller_name
                                    ? product.seller_name
                                    : "Anonym"}
                            </div>
                            <div>Condition: {product.condition}</div>
                            <div>Category: {product.category}</div>
                            <div>
                                Subcategory:{" "}
                                {product.subcategory && product.subcategory}
                            </div>
                            <div>Description: {product.description}</div>
                            <div>Price: {product.price}</div>
                            <div>
                                <button
                                    onClick={() =>
                                        router.push(
                                            `/pages/used-items/${product._id}`
                                        )
                                    }
                                >
                                    Show me the product
                                </button>
                                <button>Add to wishlist</button>
                                <button
                                    onClick={() =>
                                        addToUsedShoppingCart(product._id)
                                    }
                                >
                                    Add to shopping cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Products;
