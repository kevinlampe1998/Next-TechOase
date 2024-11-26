"use client";

import styles from "./page.module.css";
import { TheContext } from "@/components/context-provider/component";
import { useContext } from "react";
import { useEffect } from "react";

const Cart = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    const fetchCart = async () => {
        const response = await fetch(`/api/cart/${localDataBank.user._id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
    };

    useEffect(() => {
        localDataBank.user && fetchCart();
    }, [localDataBank.user]);

    return <main>Cart</main>;
};

export default Cart;
