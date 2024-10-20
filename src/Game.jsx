import React, { useState, useEffect } from 'react';
import Fruit from './Fruit';

const Game = () => {
    const [fruits, setFruits] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (!gameOver) {
            const interval = setInterval(() => {
                spawnFruit();
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [gameOver]);

    // Spawning random fruits
    const spawnFruit = () => {
        const fruitTypes = ['🍎', '🍌', '🍉', '🍍'];
        const randomFruit = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
        const fruitPosition = Math.random() * window.innerWidth;

        setFruits((prev) => [
            ...prev,
            { id: Date.now(), symbol: randomFruit, position: fruitPosition, isSliced: false },
        ]);
    };

    // Just setting score rn
    const sliceFruit = (id) => {
        setFruits((prev) =>
            prev.map((fruit) => (fruit.id === id ? { ...fruit, isSliced: true } : fruit))
        );
        setScore((prev) => prev + 1);
    };

    // Not in use yet
    const handleGameOver = () => {
        setGameOver(true);
    };

    return (
        // Game over
        <div className="game-area">
            <h2>Score: {score}</h2>
            {fruits.map((fruit) => (
                <Fruit key={fruit.id} fruit={fruit} style={{transform: 'scale(1.5)'}}  onSlice={sliceFruit} />
            ))}
            {gameOver && <h2>Game Over! Final Score: {score}</h2>}
        </div>
    );
};

export default Game;
