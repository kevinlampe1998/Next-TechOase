"use client";

import styles from "./header.module.css";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { TheContext } from "../context-provider/component";
import { usePathname } from "next/navigation";

const Header = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    const pathname = usePathname();

    useEffect(() => {
 
        window.scrollTo(0, 0);
    }, [pathname]); 

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
