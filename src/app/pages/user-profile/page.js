'use client';

// import './UserProfile.css';
import styles from './page.module.css';
import { useContext } from 'react';
import { TheContext } from '@/components/context-provider';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const { localDataBank, dispatch } = useContext(TheContext);
    // const navigate = useNavigate();
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
                <button onClick={logout} href="#">Logout</button>
                <button onClick={navigateToSeeMyProducts}>See my Products</button>
                <button>Settings</button>
                <button>My Profile Data</button>
        </section>
    );
};

export default Profile;