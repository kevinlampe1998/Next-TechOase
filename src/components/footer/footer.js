'use client';

import { useContext } from "react";
import { TheContext } from "../context-provider";
import Link from "next/link";
import styles from './footer.module.css';

const Footer = () => {
    const { localDataBank, dispatch } = useContext(TheContext);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
                {
                    localDataBank.user &&
                        <>
                            <Link href="/contact" onClick={scrollToTop}>Contact</Link>
                            <Link href="/rating" onClick={scrollToTop}>Rating</Link>
                            <Link href="/help-chat" onClick={scrollToTop}>Help-Chat</Link>
                            <Link href="/team" onClick={scrollToTop}>Team</Link>
                            <Link href="/faq" onClick={scrollToTop}>FAQ</Link>
                        </>
                }
        </footer>   
    );
};

export default Footer;