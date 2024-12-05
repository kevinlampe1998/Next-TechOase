'use client';

// import './UserProfile.css';
import styles from './page.module.css';
import { useContext } from 'react';
import { TheContext } from '@/components/context-provider/component';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    const router = useRouter();

    const logout = async () => {
        const res = await fetch('/api/users/logout', {
            method: 'DELETE',
            credentials: 'include'
        });
        const data = await res.json();

        console.log('Profile logout data', data);

        dispatch({ type: 'users-logout' });

        data.success && router.push('/pages/register-or-login');
    };

    const navigateToSeeMyProducts = () => {
        router.push('/pages/see-my-products');
    };

    return (
        <section className={styles.profile}>
                {/* <button onClick={logout} href="#">Logout</button>
                <button onClick={() => router.push('/pages/set-used-item')}>Set product to sell</button>
                <button onClick={navigateToSeeMyProducts}>See my Products</button>
                <button>Settings</button>
                <button>My Profile Data</button> */}

                {
                    localDataBank.user ?

                    <div className={styles.profile}>
                        <button onClick={logout} href="#">Logout</button>
                        <button onClick={() => router.push('/pages/set-used-item')}>Set product to sell</button>
                        <button onClick={navigateToSeeMyProducts}>See my Products</button>
                        <button>Settings</button>
                        <button>My Profile Data</button>
                    </div>

                    : localDataBank.admin ?
                    <div className={styles.profile}>
                        <button onClick={logout} href="#">Logout</button>
                    </div>

                    : <div>... loading</div>
                }
                {/* <ThreeDExample/> */}
        </section>
    );
};

export default Profile;