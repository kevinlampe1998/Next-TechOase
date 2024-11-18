"use client";

import { useEffect, useState, useContext } from "react";
import { TheContext } from "@/components/context-provider";
import { useRouter } from "next/navigation";

const Admin = () => {
    const router = useRouter();
    const [products, newproducts] = useState();
    const { localDataBank, dispatch } = useContext(TheContext);

    const getProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        console.log("getProducts data", data);

        // const idChanged = data.products.map(product =>
        //     ({ ...product, id: product._id }));

        setProducts(data.products);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <section className={styles.admin}>
            <h1>Admin</h1>
        </section>
    );
};

export default Admin;
