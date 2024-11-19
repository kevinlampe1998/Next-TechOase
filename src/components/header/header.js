"use client";

import styles from "./header.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { TheContext } from "../context-provider";

const Header = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    useEffect(() => {
        // Überschreibe console.error, um die Hydration-Warnung zu ignorieren
        if (process.env.NODE_ENV === "development") {
            const originalConsoleError = console.error;

            console.error = (...args) => {
                if (
                    typeof args[0] === "string" &&
                    args[0].includes(
                        "A tree hydrated but some attributes of the server rendered HTML didn't match"
                    )
                ) {
                    // Ignoriere spezifische Hydration-Warnungen
                    return;
                }
                originalConsoleError(...args); // Alle anderen Fehler ausgeben
            };
        }
    }, []);

    return (
        <header className={styles.header}>
            <h1 className={styles.projectName}>
                <div>Tech Oase</div>
            </h1>
            <nav className={styles.navLayout}>
                <Link href="/">Home</Link>
                <Link href="/pages/new-in-store">New in Store</Link>
                <Link href="/pages/used-items">Used Items</Link>
                <Link href="/pages/cart">Cart</Link>
                {localDataBank.user && (
                    <Link href="/pages/user-profile">
                        {localDataBank.user?.firstName}
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
