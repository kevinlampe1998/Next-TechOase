"use client";

import styles from "./page.module.css";
import { TheContext } from "@/components/context-provider/component";
import { useContext, useEffect, useState } from "react";

const Cart = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    const [cart, setCart] = useState();

    const fetchCart = async () => {
        const response = await fetch(`/api/cart/get-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                userId: localDataBank.user._id,
            }),
        });
        const data = await response.json();
        console.log(data);

        setCart(data.cart.products);
    };

    useEffect(() => {
        localDataBank.user && fetchCart();
    }, [localDataBank.user]);

    useEffect(() => {
        console.log("cart", cart);
    });

    const fetchAllProducts = async () => {
        const fetchedProducts = await Promise.all(
            cart.map(async (product) => {
                const res = await fetch(
                    `/api/new-in-store/${product.productId}`
                );
                const data = await res.json();
                return data;
            })
        );
    };

    useEffect(() => {
        fetchAllProducts();
    }, [cart]);

    return (
        <main>
            <h1>Cart</h1>
        </main>
    );
};

export default Cart;
