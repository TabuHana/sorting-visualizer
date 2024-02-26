'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { SortingAlgorithmType } from '@/lib/types';
import { MAX_ANIMATION_SPEED } from '@/lib/constants';
import { generateRandomNumberFromInterval } from '@/lib/utils';

type SortingAlgorithmContextType = {
    array: number[];
    setArray: (array: number[]) => void;
    algorithm: SortingAlgorithmType;
    setAlgorithm: (algorithm: SortingAlgorithmType) => void;
    isRunning: boolean;
    setIsRunning: (isRunning: boolean) => void;
    speed: number;
    setSpeed: (speed: number) => void;
    isSorted: boolean;
    setIsSorted: (isSorted: boolean) => void;
    resetArrayAnimation: () => void;
    runAnimation: () => void;
};

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined);

export const SortingAlgorithmProvider = ({ children }: { children: React.ReactNode }) => {
    // State & core functions
    // Arry to sort
    const [array, setArray] = useState<number[]>([100, 50, 25, 75, 150, 125, 200, 175, 225, 250]);
    // Which algorithm to use
    const [algorithm, setAlgorithm] = useState<SortingAlgorithmType>('bubble');
    // If the animation is running
    const [isRunning, setIsRunning] = useState<boolean>(false);
    // Animation speed
    const [speed, setSpeed] = useState<number>(MAX_ANIMATION_SPEED);
    // If the array is sorted
    const [isSorted, setIsSorted] = useState<boolean>(false);

    useEffect(() => {
        resetArrayAnimation();
        window.addEventListener('resize', resetArrayAnimation);

        return () => {
            window.removeEventListener('resize', resetArrayAnimation);
        };
    }, []);

    // Main functions
    // Reset the array
    const resetArrayAnimation = () => {
        const contentContainer = document.getElementById('content-container');
        if (!contentContainer) return;

        // Get the width of the content container
        const contentContainerWidth = contentContainer.clientWidth;
        // Create a temporary array
        const tempArray: number[] = [];
        // Create a number of lines based on the width of the content container
        const numLines = contentContainerWidth / 8;
        // Create a line height based on the height of the content container
        const containerHeight = window.innerHeight;
        // Set the max line height
        const maxLineHeight = Math.max(containerHeight - 420, 100);

        // Iterate over the number of lines and push a random number to the temporary array
        for (let i = 0; i < numLines; i++) {
            tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight));
        }

        setArray(tempArray);
        setIsSorted(false);
        setIsRunning(false);
    };

    // Run the animation
    const runAnimation = () => {};

    const value = {
        array,
        setArray,
        algorithm,
        setAlgorithm,
        isRunning,
        setIsRunning,
        speed,
        setSpeed,
        isSorted,
        setIsSorted,
        resetArrayAnimation,
        runAnimation,
    };

    return <SortingAlgorithmContext.Provider value={value}>{children}</SortingAlgorithmContext.Provider>;
};

export const useSortingAlgorithmContext = () => {
    const context = useContext(SortingAlgorithmContext);
    if (!context) {
        throw new Error('useSortingAlgorithmContext must be used within a SortingAlgorithmProvider');
    }
    return context;
};
