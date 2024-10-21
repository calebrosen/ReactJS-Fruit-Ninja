import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const Fruit = ({ fruit, onClick }) => {
    const [fruitY, setFruitY] = useState(0); // Start at the bottom
    const [fruitX, setFruitX] = useState(Math.floor(Math.random() * (window.innerWidth - 50)));
    const [hasAnimated, setHasAnimated] = useState(false); // State to control if it has animated

    useEffect(() => {
        resetFruit(); // Reset position on mount
    }, []);

    const resetFruit = () => {
        setFruitY(0); // Reset to the bottom
        setFruitX(Math.floor(Math.random() * (window.innerWidth - 50))); // Random X position
        setHasAnimated(false); // Allow animation
    };

    const handleAnimationComplete = () => {
        if (hasAnimated) {
            resetFruit(); // Reset position after falling down
        }
    };

    return (
        <motion.div
            className="fruit"
            style={{
                position: 'absolute',
                transform: `translateX(${fruitX}px)`,
                bottom: '0',
                overflow: 'hidden',
                fontSize: '50px',
                cursor: 'pointer',
            }}
            onClick={onClick}
            initial={{ y: fruitY, x: fruitX }}
            animate={{ y: hasAnimated ? 0 : Math.floor(Math.random() * -800) }} // Go up once
            transition={{
                duration: 2,
                ease: "easeInOut",
                onComplete: () => {
                    if (!hasAnimated) {
                        setHasAnimated(true); // Mark as animated
                    } else {
                        handleAnimationComplete(); // Handle reset
                    }
                },
            }}
        >
            {fruit.symbol}
        </motion.div>
    );
};

export default Fruit;
