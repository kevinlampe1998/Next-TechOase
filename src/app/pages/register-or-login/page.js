"use client";

import { useRef, useContext } from "react";
import { TheContext } from "@/components/context-provider/component";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const RegisterOrLogin = () => {
    const decideSection = useRef();
    const registerForm = useRef();
    const loginForm = useRef();
    const { dispatch } = useContext(TheContext);
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

        try {
            const formData = {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                street: e.target.street.value,
                postalCode: e.target.postalCode.value,
                town: e.target.town.value,
                birthDay: e.target.birthDay.value,
                password: e.target.password.value,
            };

            const res = await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            dispatch({ type: "users-login", payload: data.savedUser });

            if (data.success) {
                router.push("/");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed: " + error.message);
        }
    };

    const postLogin = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                email: e.target.email.value,
                password: e.target.password.value,
            };

            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            if (data.isAdmin) {
                dispatch({ type: "admin-login", payload: data.admin });
                router.push("/pages/admin");
                return;
            }

            dispatch({ type: "users-login", payload: data.searchedUser });

            if (data.success) {
                router.push("/");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + error.message);
        }
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
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" name="street" required />

                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="number"
                        id="postalCode"
                        name="postalCode"
                        required
                    />

                    <label htmlFor="town">Town</label>
                    <input type="text" id="town" name="town" required />

                    <label htmlFor="birthDay">Birthday</label>
                    <input type="date" id="birthDay" name="birthDay" required />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />

                    <button type="submit">Register</button>
                </form>

                <form
                    className={styles.login}
                    ref={loginForm}
                    onSubmit={postLogin}
                >
                    <h2>Login</h2>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        // </div>
    );
};

export default RegisterOrLogin;
