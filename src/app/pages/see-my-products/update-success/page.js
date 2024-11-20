'use client';
import { useRouter } from "next/navigation";

const SetProductSuccess = () => {
    const router = useRouter();

    return (
        <main>
            <h4>You have successful updated your Product</h4>
            <button onClick={() => router.push('/pages/see-my-products')}>See your products again</button>
            <button onClick={() => router.push('/')}>Back to Home</button>
        </main>
    );
};

export default SetProductSuccess;