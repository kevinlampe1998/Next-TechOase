'use client';

import { useState } from "react";
import styles from './page.module.css';

// Beispiel-Daten für die FAQs
const faqs = [
    {
        question: "Wie lange dauert der Versand?",
        answer: "Der Versand dauert in der Regel 3-5 Werktage.",
    },
    {
        question: "Wie kann ich meine Bestellung zurückgeben?",
        answer: "Um eine Rücksendung zu veranlassen, kontaktieren Sie bitte unseren Kundenservice.",
    },
    {
        question: "Welche Zahlungsmethoden akzeptiert Techoase?",
        answer: "Wir akzeptieren Kreditkarten, PayPal und Klarna.",
    },
    {
        question: "Bieten Sie internationale Lieferung an?",
        answer: "Ja, wir liefern weltweit. Die Versandkosten variieren je nach Destination.",
    },
];

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.faqItem}>
            <div className={styles.faqQuestion} onClick={toggleAnswer}>
                <h3>{question}</h3>
                <span>{isOpen ? "-" : "+"}</span>
            </div>
            {isOpen && (
                <div className={styles.faqAnswer}>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQPage = () => {
    return (
        <div className={styles.faqPage}>
            <div className={styles.faqBG}></div>
            <h1>Häufig gestellte Fragen (FAQ)</h1>
            {faqs.map((faq, index) => (
                <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                />
            ))}
        </div>
    );
};

export default FAQPage;