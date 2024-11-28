"use client";

<style>
    @import
    url(https://fonts.googleapis.com/css2?family=Rubik+Iso&display=swap);
</style>;

import styles from "./header.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { TheContext } from "../context-provider/component";

const Header = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    return (
        <header className={styles.header}>
            <h1 className={styles.projectName}>
                <div>Tech Oase</div>
            </h1>
            {localDataBank.user && (
                <nav className={styles.navLayout}>
                    <Link href="/">Home</Link>
                    <Link href="/pages/new-in-store">New in Store</Link>
                    <Link href="/pages/used-items">User Deals</Link>
                    <Link href="/pages/cart">Cart</Link>
                    <Link href="/pages/user-profile">
                        {localDataBank.user?.firstName}
                    </Link>
                </nav>
            )}
        </header>
    );
};

export default Header;
