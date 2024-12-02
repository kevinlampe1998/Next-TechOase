"use client";

import Head from "next/head";
import styles from "./page.module.css";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
    const left = useRef();
    const right = useRef();
    const container = useRef();
    const router = useRouter();

    const toggleHoverClass = (side) => {
        // if (side === "left") {
        //     container.current.classList.add(styles["hover-left"]);
        //     // container.current.classList.remove(styles["hover-right"]);
        // } else if (side === 'right') {
        //     container.current.classList.add(styles["hover-right"]);
        //     // container.current.classList.remove(styles["hover-left"]);
        // } else {
        //     container.current.classList.remove(styles["hover-left"]);
        //     container.current.classList.remove(styles["hover-right"]);
        // }
        if (side === "left") {
            container.current.classList.add(styles["hover-left"]);
            container.current.classList.remove(styles["hover-right"]);
        } else if (side === "right") {
            container.current.classList.add(styles["hover-right"]);
            container.current.classList.remove(styles["hover-left"]);
        } else {
            // Wenn Maus den Container verlässt, alle Hover-Klassen entfernen
            container.current.classList.remove(styles["hover-left"]);
            container.current.classList.remove(styles["hover-right"]);
        }
    };

    useEffect(() => {
        console.log('container', container.current.classList);
    });

    return (
        <>
            <div ref={container} className={styles.container}
                onMouseLeave={() => toggleHoverClass()}
            >
                <div
                    ref={left}
                    // onMouseLeave={() => toggleHoverClass("right")}
                    onMouseEnter={() => toggleHoverClass("left")}
                    className={`${styles.split} ${styles.left}`}
                >
                    <h1>
                        TechOase
                        <br />
                        Here your New Products
                    </h1>
                    
                    <a
                        onClick={async (e) => (e.preventDefault(), router.push("/pages/new-in-store"))}
                        className={styles.btn}
                    >
                        Join
                    </a>
                </div>
                <div
                    ref={right}
                    // onMouseLeave={() => toggleHoverClass("left")}
                    onMouseEnter={() => toggleHoverClass("right")}
                    className={`${styles.split} ${styles.right}`}
                >
                    <h1>
                        Used Items
                        <br />
                        Your Market Place
                    </h1>
                    <a
                        onClick={async (e) => (e.preventDefault(), router.push("/pages/used-items"))}
                        className={styles.btn}
                    >
                        Join
                    </a>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
