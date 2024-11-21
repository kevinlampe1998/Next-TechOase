'use client';
import { useRouter } from "next/navigation";
import styles from './page.module.css';

const SetProductSuccess = () => {
    const router = useRouter();

    return (
        <main className={styles.setUsedItemSuccess}>
            <h4>You have successful saved your Product</h4>
            <div>
                <button onClick={() => router.push('/pages/set-used-item')}>Set a product again</button>
                <button onClick={() => router.push('/')}>Back to Home</button>
            </div>
        </main>
    );
};

export default SetProductSuccess;