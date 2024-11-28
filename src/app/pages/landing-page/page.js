"use client";

import Head from "next/head";
import styles from "./page.module.css";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
    const left = useRef();
    const right = useRef();
    const container = useRef();
    const router = useRouter();

    const toggleHoverClass = (side) => {
        if (side === "left") {
            container.current.classList.add(styles["hover-left"]);
            container.current.classList.remove(styles["hover-right"]);
        } else {
            container.current.classList.add(styles["hover-right"]);
            container.current.classList.remove(styles["hover-left"]);
        }
    };

    return (
        <>
            <div ref={container} className={styles.container}>
                <div
                    ref={left}
                    onMouseLeave={() => toggleHoverClass("left")}
                    onMouseEnter={() => toggleHoverClass("left")}
                    className={`${styles.split} ${styles.left}`}
                >
                    <h1>
                        TechOase
                        <br />- here your New Products
                    </h1>
                    <a
                        onClick={() => router.push("/pages/new-in-store")}
                        className={styles.btn}
                    >
                        Join
                    </a>
                </div>
                <div
                    ref={right}
                    onMouseLeave={() => toggleHoverClass("right")}
                    onMouseEnter={() => toggleHoverClass("right")}
                    className={`${styles.split} ${styles.right}`}
                >
                    <h1>
                        Used Items
                        <br /> - your Market Place
                    </h1>
                    <a
                        onClick={() => router.push("/pages/used-items")}
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
