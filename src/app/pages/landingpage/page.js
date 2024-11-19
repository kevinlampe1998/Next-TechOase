import Head from "next/head";
import styles from "./Home.module.css";

export default function Home() {
    return (
        <>
            <Head>
                <title>Split Landing Page</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <main className={styles.container}>
                <div className={`${styles.split} ${styles.left}`}>
                    <h1>TechOase</h1>
                    <a href="#" className={styles.btn}>
                        Join
                    </a>
                </div>
                <div className={`${styles.split} ${styles.right}`}>
                    <h1>UsedItems</h1>
                    <a href="#" className={styles.btn}>
                        Join
                    </a>
                </div>
            </main>
        </>
    );
}
