'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

const NewInStoreProducts = () => {
    const [ computers, setComputers ] = useState();
    const router = useRouter();

    const fetchProducts = async () => {
        const res = await fetch('/api/new-in-store');
        const data = await res.json();

        console.log(data);
        setComputers(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <main className={styles.newInStoreProducts}>
            {
                computers ?
                
                computers.map(computer => (
                    <section key={computer._id}>
                        <h2>{computer.manufacturer}</h2>
                        <h3>{computer.model}</h3>
                        <img src={computer?.main_picture?.url} />
                        <div>
                            <button onClick={() => router.push(`/pages/admin/new-in-store-products/${computer._id}`)}>Add other pics</button>
                        </div>
                    </section>
                )) : <div>...loading</div>
            }
        </main>
    );
};

export default NewInStoreProducts;