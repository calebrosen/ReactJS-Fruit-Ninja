import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const Fruit = ({ fruit, onClick }) => {
    // Initial Y
    const [fruitY, setFruitY] = useState(800); 
     // Initial X
    const [maxHeight, setMaxHeight] = useState(-300);
     // Random horizontal position
    const [fruitX, setFruitX] = useState(Math.floor(Math.random() * window.innerWidth));

    useEffect(() => {
        // Function to reset the fruit's properties
        const resetFruit = () => {
            setFruitY(800); // Resetting to the botom of the screen
            setMaxHeight(Math.floor(Math.random() * -800) - 200);
            setFruitX(Math.floor(Math.random() * window.innerWidth)); // Random horizontal position
        };

        // Calling periodically
        const interval = setInterval(() => {
            resetFruit();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        //individual fruit
        <motion.div
        className="fruit"
        style={{
            position: 'absolute',
            transform: `translateX(${fruitX}px)`,
            bottom: '0',
            fontSize: '50px',
            cursor: 'pointer',
        }}
        onClick={onClick}
        initial={{ y: fruitY }}
        animate={{ y: [fruitY, maxHeight, fruitY] }}
        transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
        }}
    >
        {fruit.symbol}
    </motion.div>
    );
};

export default Fruit;
