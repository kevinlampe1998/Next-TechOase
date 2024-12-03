"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data:", formData);
        alert("Vielen Dank für deine Nachricht!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className={styles.contactContainer}>
            <div className={styles.contactBG}></div>
            <h2>Kontaktiere uns</h2>
            <form onSubmit={handleSubmit} className={styles.formGroup}>
                {/* <div> */}
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                {/* </div> */}
                {/* <div className="form-group"> */}
                    <label htmlFor="email">E-Mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                {/* </div> */}
                {/* <div className="form-group"> */}
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                {/* </div> */}
                <button type="submit">Absenden</button>
            </form>
        </div>
    );
};

export default Contact;
