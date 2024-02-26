import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AnimationArrayType, SortingAlgorithmType } from './types';
import { generateBubbleSortAnimationArray } from '@/algorithms/bubble-sort';
import { generateQuickSortAnimationArray } from '@/algorithms/quick-sort';
import { generateMergeSortAnimationArray } from '@/algorithms/merge-sort';
import { generateInsertionSortAnimationArray } from '@/algorithms/insertion-sort';
import { generateSelectionSortAnimationArray } from '@/algorithms/selection-sort';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateRandomNumberFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateAnimationArray(
    selectedAlgorithm: SortingAlgorithmType,
    isRunning: boolean,
    array: number[],
    runAnimation: (animations: AnimationArrayType) => void
) {
    switch (selectedAlgorithm) {
        case 'bubble':
            // Generate the bubble sort animations
            generateBubbleSortAnimationArray(isRunning, array, runAnimation);
            break;
        case 'quick':
            generateQuickSortAnimationArray(isRunning, array, runAnimation);
            break;
        case 'merge':
            generateMergeSortAnimationArray(isRunning, array, runAnimation);
            break;
        case 'insertion':
            generateInsertionSortAnimationArray(isRunning, array, runAnimation);
            break;
        case 'selection':
            generateSelectionSortAnimationArray(isRunning, array, runAnimation);
            break;
        default:
            break;
    }
}
