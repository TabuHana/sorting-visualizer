'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { AnimationArrayType, SortingAlgorithmType } from '@/lib/types';
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
    runAnimation: (animations: AnimationArrayType) => void;
    requiresReset: boolean;
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
    const requiresReset = isSorted || isRunning;

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

        // Reset the timeouts
        // Putting the setTimeout at the end of the call stack
        const highestId = window.setTimeout(() => {
            for (let i = highestId; i >= 0; i--) {
                window.clearTimeout(i);
            }
        }, 0);

        setTimeout(() => {
            const arrayLines = document.getElementsByClassName('array-line')
            for (let i = 0; i < arrayLines.length; i++) {
                arrayLines[i].classList.remove('change-line-color');
                arrayLines[i].classList.add('default-line-color');
            }
        }, 0);
    };

    // Run the animation
    const runAnimation = (animations: AnimationArrayType) => {
        setIsRunning(true);

        // When increasing the speed, the value is slower so we get the inverse
        const inverseSpeed = (1 / speed) * 200;
        const arrayLines = document.getElementsByClassName('array-line') as HTMLCollectionOf<HTMLElement>;

        const updateClassList = (indexes: number[], addClassName: string, removeClassName: string) => {
            indexes.forEach(index => {
                arrayLines[index].classList.add(addClassName);
                arrayLines[index].classList.remove(removeClassName);
            });
        };

        const updateHeightValue = (lineIndex: number, newHeight: number | undefined) => {
            if (newHeight === undefined) return;
            arrayLines[lineIndex].style.height = `${newHeight}px`;
        };

        animations.forEach((animation, index) => {
            setTimeout(() => {
                // values will be a new indexs or a new height
                // isSwap will be a boolean
                // getting both from the animation array
                const [values, isSwap] = animation;

                // If isSwap is false, we are only changing the colors
                if (!isSwap) {
                    updateClassList(values, 'change-line-color', 'default-line-color');
                    // revert the colors back at the inverse speed
                    setTimeout(() => {
                        updateClassList(values, 'default-line-color', 'change-line-color');
                    }, inverseSpeed);
                } else {
                    // If isSwap is true, we are changing the heights
                    const [lineIndex, newHeight] = values;
                    updateHeightValue(lineIndex, newHeight);
                }
            }, index * inverseSpeed);
        });

        // Set the array as sorted
        const finalTimeout = animations.length * inverseSpeed;

        setTimeout(() => {
            Array.from(arrayLines).forEach(line => {
                line.classList.add('pulse-animation', 'change-line-color');
                line.classList.remove('default-line-color');
            });

            setTimeout(() => {
                Array.from(arrayLines).forEach(line => {
                    line.classList.remove('pulse-animation', 'change-line-color');
                    line.classList.add('default-line-color');
                });
                setIsRunning(false);
                setIsSorted(true);
            }, 1000);
        }, finalTimeout);
    };

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
        requiresReset,
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
