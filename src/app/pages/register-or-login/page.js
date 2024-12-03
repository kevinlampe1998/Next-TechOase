"use client";

import { useRef, createContext, useContext, useEffect } from "react";
import { TheContext } from "@/components/context-provider/component";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const RegisterOrLogin = () => {
    const decideSection = useRef();
    const registerForm = useRef();
    const loginForm = useRef();
    const { localDataBank, dispatch } = useContext(TheContext);
    const router = useRouter();

    const openRegister = () => {
        decideSection.current.style.display = "none";
        registerForm.current.style.display = "flex";
    };

    const openLogin = () => {
        decideSection.current.style.display = "none";
        loginForm.current.style.display = "flex";
    };

    const postRegister = async (e) => {
        e.preventDefault();

        const firstName = e.target.children[2].value;

        const lastName = e.target.children[4].value;

        const email = e.target.children[6].value;

        const street = e.target.children[8].value;

        const postalCode = e.target.children[10].value;

        const town = e.target.children[12].value;

        const birthDay = e.target.children[14].value;

        const password = e.target.children[16].value;

        const res = await fetch("/api/users/register", {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                street,
                postalCode,
                town,
                birthDay,
                password,
            }),
            headers: { "content-type": "application/json" },
        });

        const data = await res.json();
        console.log("postRegister data", data);

        dispatch({ type: "users-login", payload: data.savedUser });

        data.success && router.push("/");
    };

    const postLogin = async (e) => {
        e.preventDefault();

        const email = e.target.children[2].value;
        const password = e.target.children[4].value;

        const res = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        const data = await res.json();
        console.log('postLogin data', data);

        if (data.isAdmin) {
            dispatch({ type: "admin-login", payload: data.admin });

            router.push("/pages/admin");
            return;
        }
        dispatch({ type: "users-login", payload: data.searchedUser });

        data.success && router.push("/");
    };

    return (
        <div className={styles.registerOrLogin}>
            <div className={styles.registerOrLoginBG}></div>
            <section
                className={styles.decideRegisterOrLogin}
                ref={decideSection}
            >
                <button onClick={openRegister}>Register</button>
                <button onClick={openLogin}>Login</button>
            </section>

            <form
                className={styles.register}
                ref={registerForm}
                onSubmit={postRegister}
            >
                <h2>Register</h2>

                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" />

                <label htmlFor="email-register">Email</label>
                <input type="email" id="email-register" />

                <label htmlFor="street">Street</label>
                <input type="text" id="street" />

                <label htmlFor="postalCode">Postal Code</label>
                <input type="number" id="postalCode" />

                <label htmlFor="town">Town</label>
                <input type="text" id="town" />

                <label htmlFor="birthDay">Birthday</label>
                <input type="date" id="birthDay" />

                <label htmlFor="password-register">Password</label>
                <input type="password" id="password-register" />

                <button type="submit">Submit</button>
            </form>

            <form className={styles.login} ref={loginForm} onSubmit={postLogin}>
                <h2>Login</h2>

                <label htmlFor="email-login">Email</label>
                <input type="text" id="email-login" />

                <label htmlFor="password-login">Password</label>
                <input type="password" id="password-login" />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RegisterOrLogin;
