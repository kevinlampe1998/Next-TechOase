'use client';

import React, { useState } from "react";
import { Star } from "lucide-react";
import styles from './page.module.css';

const Rating = () => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        if (rating > 0) {
            setIsSubmitted(true);
            // Hier könnte man die Bewertung und den Kommentar an einen Server senden
            console.log({
                rating,
                comment,
            });
        }
    };

    return (
        <div className={styles.rating}>
            <div className={styles.ratingBG}></div>
            <h2>
                Wie bewerten Sie unseren Service?
            </h2>

            <div>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => handleStarClick(star)}
                        disabled={isSubmitted}
                    >
                        <Star
                            size={32}
                            
                        />
                    </button>
                ))}
            </div>

            <p className="mb-4">
                {rating === 0
                    ? "Wählen Sie eine Bewertung"
                    : isSubmitted
                    ? "Vielen Dank für Ihre Bewertung!"
                    : `Sie haben ${rating} ${
                          rating === 1 ? "Stern" : "Sterne"
                      } ausgewählt`}
            </p>

            <div className="mb-4">
                <label
                    htmlFor="comment"
                    
                >
                    Ihr Kommentar (optional)
                </label>
                <textarea
                    id="comment"
                    rows={4}
                    placeholder="Teilen Sie uns Ihre Erfahrungen mit..."
                    value={comment}
                    onChange={handleCommentChange}
                    disabled={isSubmitted}
                />
            </div>

            {isSubmitted && comment && (
                <div >
                    <p>
                        Ihr Kommentar:
                    </p>
                    <p>{comment}</p>
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={rating === 0 || isSubmitted}
                
            >
                {isSubmitted ? "Gesendet" : "Bewertung absenden"}
            </button>

            {isSubmitted && (
                <p>
                    Ihre Bewertung wurde erfolgreich übermittelt. Vielen Dank
                    für Ihr Feedback!
                </p>
            )}
        </div>
    );
};

export default Rating;

//test//