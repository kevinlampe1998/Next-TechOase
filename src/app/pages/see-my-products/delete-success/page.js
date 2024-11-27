'use client';
import { useRouter } from "next/navigation";
import styles from './page.module.css';

const SetProductSuccess = () => {
    const router = useRouter();

    return (
        <main className={styles.setUsedItemSuccess}>
            <h4>You have successful deleted your Product</h4>
            <button onClick={() => router.push('/pages/see-my-products')}>See your products again</button>
            <button onClick={() => router.push('/')}>Back to Home</button>
        </main>
    );
};

export default SetProductSuccess;