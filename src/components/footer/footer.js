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
                                <h3>TechOase</h3>
                                <Link href="/pages/contact" onClick={scrollToTop}>Contact</Link>
                                <Link href="/pages/rating" onClick={scrollToTop}>Rating</Link>
                                <Link href="/pages/help-chat" onClick={scrollToTop}>Help-Chat</Link>
                                <Link href="/pages/team-project" onClick={scrollToTop}>Team</Link>
                                <Link href="/pages/faq" onClick={scrollToTop}>FAQ</Link>
                            </section>
                            {/* <section>
                                <h3>Buy</h3>
                                <a href="#">Registration</a>
                                <a href="#">Bidding & buying help</a>
                                <a href="#">Stores</a>
                                <a href="#">TechOase for Charity</a>
                                <a href="#">Seasonal Sales and events</a>
                                <a href="#">TechOase Gift Cards</a>
                            </section>
                            <section>
                                <h3>Sell</h3>
                                <a href="#">Start selling</a>
                                <a href="#">How to sell</a>
                                <a href="#">Business sellers</a>
                                <a href="#">Affiliates</a>
                            </section>
                            <section>
                                <h3>Tools & apps</h3>
                                <a href="#">Developers</a>
                                <a href="#">Security center</a>
                                <a href="#">Site map</a>
                            </section>
                            <section>
                                <h3>TechOase companies</h3>
                                <a href="#">TCGplayer</a>
                            </section>
                            <section>
                                <h3>Stay connected</h3>
                                <a href="#">Facebook</a>
                                <a href="#">Twitter</a>
                            </section>
                            <section>
                                <h3>About TechOase</h3>
                                <a href="#">Company info</a>
                                <a href="#">News</a>
                                <a href="#">Investors</a>
                                <a href="#">Careers</a>
                                <a href="#">Diversity & Inclusion</a>
                                <a href="#">Global Impact</a>
                                <a href="#">Government relations</a>
                                <a href="#">Advertise with us</a>
                                <a href="#">Policies</a>
                                <a href="#">Verified Rights Owner {'VerO'} Program</a>
                                <a href="#">eCl Licenses</a>
                            </section>
                            <section>
                                <h3>Help & Contact</h3>
                                <a href="#">Seller Center</a>
                                <a href="#">Contact us</a>
                                <a href="#">TechOase Returns</a>
                                <a href="#">TechOase Money Back Guarantee</a>
                            </section>
                            <section>
                                <h3>Community</h3>
                                <a href="#">Announcements</a>
                                <a href="#">TechOase Community</a>
                                <a href="#">TechOase for Business Podcast</a>
                            </section> */}
                        </div>
                }
        </footer>   
    );
};

export default Footer;