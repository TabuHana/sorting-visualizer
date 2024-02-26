import { AnimationArrayType } from '@/lib/types';

const runBubbleSort = (array: number[], animations: AnimationArrayType) => {
    for (let i = 0; i < array.length -1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            animations.push([[j, j + 1], false]);
            if (array[j] > array[j+1]) {
                animations.push([[j, array[j+1]], true]);
                animations.push([[j+1, array[j]], true]);
                [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
    }
}

export function generateBubbleSortAnimationArray(
    isRunning: boolean,
    array: number[],
    runAnimation: (animations: AnimationArrayType) => void
) {
    // Defensive programming, this should never get triggered
    if (isRunning) return;
    if (array.length <= 1) return;

    // Initialize the animations array
    const animations: AnimationArrayType = [];
    const auxiliaryArray = array.slice()
    runBubbleSort(auxiliaryArray, animations);
    runAnimation(animations);
}
