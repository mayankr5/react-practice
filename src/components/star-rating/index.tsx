import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import './styles.css'

const StarRating = () => {

    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0); 

    const handleClick = (index: number) => {
        setRating(index);
    }

    const handleMouseEnter = (index: number) => {
        setHover(index);
    }

    const handleMouseLeave = () => {
        setHover(rating);
    }

    const handleReset = () => {
        setHover(0);
        setRating(0);
    }

    return (
        <div className="container">
            <div className='star-container'>
                { 
                    [...Array(5)].map((_, index) => {
                        index += 1;

                        return <FaStar 
                            className={ (index <= rating) || (index <= hover) ? 'active' : 'inactive'}
                            key={index} 
                            onClick={() => handleClick(index)}  
                            onMouseEnter={() => handleMouseEnter(index)} 
                            onMouseLeave={handleMouseLeave}
                            size={40}
                            />
                    })
                }
            </div>
            <button onClick={handleReset}>Reset</button>
        </div>
    )
}

export default StarRating;