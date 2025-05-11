import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './styles.css';

const StarRating: React.FC = () => {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);

    const handleClick = (index: number): void => {
        setRating(index);
    };

    const handleMouseEnter = (index: number): void => {
        setHover(index);
    };

    const handleMouseLeave = (): void => {
        setHover(rating);
    };

    const handleReset = (): void => {
        setHover(0);
        setRating(0);
    };

    return (
        <div className="container">
            <div className="star-container">
                {[...Array(5)].map((_, i) => {
                    const index = i + 1;
                    return (
                        <FaStar
                            key={index}
                            className={
                                index <= (hover || rating) ? 'active' : 'inactive'
                            }
                            onClick={() => handleClick(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            size={40}
                        />
                    );
                })}
            </div>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default StarRating;
