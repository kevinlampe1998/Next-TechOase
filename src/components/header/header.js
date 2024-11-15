'use client';

import styles from './header.module.css';
import { useState, useContext, useRef, useEffect } from "react";
import Link from "next/link";
import { TheContext } from "../context-provider";

const Header = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    return (
    <header className={styles.header}>
        <h1 className={styles.projectName}>
            <div>Tech Oase</div>
        </h1>
        <nav className={styles.navLayout}>
            <Link href="/">New in Store</Link>
            <Link href='/used-items'>Used Items</Link>
            {
                localDataBank.user &&
                <Link href='/user-profile'>{ localDataBank.user?.firstName }</Link>
            }

        </nav>
    </header>
    );
};

export default Header;