'use client';

import { useContext, useEffect, useRef } from "react";
import { TheContext } from "../context-provider/component";
import Link from "next/link";
import styles from './footer.module.css';
import { usePathname } from "next/navigation";


const Footer = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const pathName = usePathname();
    const footer = useRef();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        console.log(pathName);
        pathName === '/' ? (footer.current.style.marginTop = '0px')
            : (footer.current.style.marginTop = '300px')
    });

    return (
        <footer className={styles.footer} ref={footer}>
                {
                    localDataBank.user &&
                        <div>
                            <section>
                                <Link href="/pages/contact" onClick={scrollToTop}>Contact</Link>
                                <Link href="/pages/rating" onClick={scrollToTop}>Rating</Link>
                                <Link href="/pages/help-chat" onClick={scrollToTop}>Help-Chat</Link>
                                <Link href="/pages/team-project" onClick={scrollToTop}>Team</Link>
                                <Link href="/pages/faq" onClick={scrollToTop}>FAQ</Link>
                            </section>
                            <section className={styles.socialMediaLinks}>

                                <Link href='#'>
                                    <img src="/social-media-logos/icons8-facebook-circled.gif" />
                                </Link>
                                <Link href='#'>
                                    <img src="/social-media-logos/icons8-whatsapp.gif" />
                                </Link>
                                <Link href='#'>
                                    <img src="/social-media-logos/icons8-telegram-app-48.png" />
                                </Link>
                                <Link href='#'>
                                    <img src="/social-media-logos/icons8-instagram-48.png" />
                                </Link>
                                <Link href='#'>
                                    <img src="/social-media-logos/icons8-youtube-48.png" />
                                </Link>

                            </section>
                        </div>
                }
        </footer>   
    );
};

export default Footer;