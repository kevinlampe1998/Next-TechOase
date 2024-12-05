"use client";

import styles from "./page.module.css";
import { TheContext } from "@/components/context-provider/component";
import { useContext, useEffect, useState } from "react";

const Cart = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    const [ cart, setCart ] = useState();
    const [ products, setProducts ] = useState();

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

        setCart(data.cart.products);
    };

    useEffect(() => {
        localDataBank.user && fetchCart();
    }, [localDataBank.user]);

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
        setProducts(fetchedProducts);
    };

    const removeFromCart = async (productId) => {
        const res = await fetch('/api/cart/remove-from-cart', {
            method: 'POST',
            body: JSON.stringify({
                productId, userId: localDataBank.user._id
            }),
            headers: { 'content-type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);

        window.location.reload();

    };

    useEffect(() => {
        cart && fetchAllProducts();
    }, [cart]);

    return (
        <main key={'1234'} className={styles.cart}>
            <div className={styles.cartBG}></div>
            <h1 key={'123'}>Cart</h1>

            {
                products ?

                products.map((product, index) => (
                    <div key={index} className={styles.cartProduct}>
                        <img src={product?.main_picture?.url}/>
                        <div>
                            <div>
                                <h3>Manufacturer</h3>
                                <span>{product.manufacturer}</span>
                            </div>
                            <div>
                                <h3>Model</h3>
                                <span>{product.model}</span>
                            </div>
                            <div>
                                <h3>Price</h3>
                                <span>{parseInt(product.price)},00 $</span>
                            </div>
                            <div>
                                <button onClick={() => removeFromCart(product._id)}>Remove from cart</button>
                            </div>
                        </div>
                    </div>
                ))
                
                : <div className={styles.cartLoading}>... loading</div>
            }

            <h4>
                {   products &&
                        `${products.reduce((total, product) => {
                            const price = parseInt(product.price) || 0;
                            return total + price;
                        }, 0)},00 $`
                }
            </h4>

            {
               products && <button>Buy</button>
            }

        </main>
    );
};

export default Cart;
