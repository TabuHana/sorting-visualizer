'use client';

import { createContext, useContext, useState } from 'react';

import { SortingAlgorithmType } from '@/lib/types';
import { MAX_ANIMATION_SPEED } from '@/lib/constants';

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
    resetArray: (length: number) => void;
    runAnimation: () => void;
};

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined);

export const SortingAlgorithmProvider = ({ children }: { children: React.ReactNode }) => {
    // State & core functions
    // Arry to sort
    const [array, setArray] = useState<number[]>([]);
    // Which algorithm to use
    const [algorithm, setAlgorithm] = useState<SortingAlgorithmType>('bubble');
    // If the animation is running
    const [isRunning, setIsRunning] = useState<boolean>(false);
    // Animation speed
    const [speed, setSpeed] = useState<number>(MAX_ANIMATION_SPEED);
    // If the array is sorted
    const [isSorted, setIsSorted] = useState<boolean>(false);

    // Main functions
    // Reset the array
    const resetArray = (length: number) => {
        const newArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
        setArray(newArray);
        setIsSorted(false);
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
        resetArray,
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
