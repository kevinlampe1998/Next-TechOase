"use client";

{/* <style>
    @import
    url(https://fonts.googleapis.com/css2?family=Rubik+Iso&display=swap);
</style>; */}

import styles from "./header.module.css";
import { useContext, useEffect, useState } from "react";
import { TheContext } from "../context-provider/component";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, User } from 'lucide-react';

const Header = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const router = useRouter();
    const pathname = usePathname();
    const [ computers, setComputers ] = useState();
    const [ cartValues, setCartValues ] = useState({
        totalPrice: 0,
        articleAmount: 0
    });

    const fetchCart = async () => {
        const res = await fetch('/api/cart/get-cart', {
            method: 'POST',
            body: JSON.stringify({ userId: localDataBank.user._id }),
            headers: { 'content-type': 'application/json' }
        });
        const data = await res.json();

        // console.log(data);
        dispatch({ type: 'set-cart', payload: data.cart.products });
    };

    useEffect(() => {
 
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        localDataBank.user && localDataBank.user._id && fetchCart();
    }, [localDataBank.user, localDataBank.renewCartLogo]);

    const fetchComputers = async (computerId) => {
        const res = await fetch(`/api/new-in-store/${computerId}`);
        const data = await res.json();

        console.log(data);
        return data;
    };

    useEffect(() => {
        localDataBank.cart && console.log(localDataBank.cart);

        if (localDataBank.cart) {
    
            (async () => {
                const fetchedComputers = await Promise.all(
                    localDataBank.cart.map(async (computerRef) => {
                        const computerObj = await fetchComputers(computerRef.productId);
                        return computerObj;
                    })
                )
                console.log('fetchedComputers', fetchedComputers);
                console.log('fetchedComputers[0]', fetchedComputers[0]);
                console.log('fetchedComputers[1]', fetchedComputers[1]);

                setComputers(fetchedComputers);
            })();
    
                
            // setComputers(fetchedComputers);
        }
        

    }, [localDataBank.cart]);

    useEffect(() => {
        console.log('computers', computers);


        if (computers) {

            console.log('Array.isArray(computers)', Array.isArray(computers));

            for (let key in computers) {
                console.log('key', key);
                console.log('computers[key]', computers[key]);
            }

            computers.forEach((computer, index) => console.log(`computer ${index}`, computer));

            console.log('computers.length', computers.length);
            setCartValues(prev => ({ ...prev, articleAmount: computers.length }));

            const total = computers.reduce((acc, computer) => {
                const price = parseInt(computer.price);
                return acc + price;
            }, 0)
            console.log('total in useEffect', total);

            setCartValues(prev => ({ ...prev, totalPrice: total }));
        }
    }, [computers]);

    useEffect(() => {
        console.log('cartValues', cartValues)
    });

    useEffect(() => {
        console.log('renewCartLogo', localDataBank.renewCartLogo);
    });


    return (
        <header className={styles.header}>
            <h1 className={styles.projectName}>
                <div>Tech Oase</div>
            </h1>
            {localDataBank.user ? 
                <section>
                    <nav className={styles.navLayout2}>
                        <Link className={styles.cartLogo} href="/pages/cart">
                            <ShoppingCart size={22} />
                            <p>{cartValues.articleAmount && cartValues.totalPrice &&
                                (`Art: ${cartValues.articleAmount}, $ ${cartValues.totalPrice},00`)}</p>
                        </Link>
                        <Link className={styles.profileLogo} href="/pages/user-profile">
                            {/* {localDataBank.user?.firstName} */}
                            <User size={22} />
                        </Link>
                    </nav>
                    <nav className={styles.navLayout}>
                        <Link href='/'>Home</Link>
                        <Link href="/pages/new-in-store">New in Store</Link>
                        <Link href="/pages/used-items">User Deals</Link>
                    </nav>
                </section>

                : localDataBank.admin ?

                <section>
                <nav className={styles.navLayout2}>

                    <Link className={styles.profileLogo} href="/pages/user-profile">
                        {/* {localDataBank.user?.firstName} */}
                        <User size={22} />
                    </Link>
                </nav>
                <nav className={styles.navLayout}>
                    <Link href="/pages/admin">Home</Link>
                    <Link href="/pages/new-in-store">New in Store</Link>
                    <Link href="/pages/admin/set-product">Set in New in Store</Link>
                    
                </nav>
            </section>

                : <section></section>
            }
        </header>
    );
};

export default Header;
