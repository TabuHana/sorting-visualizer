'use client';

import { AlgorithmSelect } from '@/components/algorithm-select';
import { CardWrapper } from '@/components/card-wrapper';
import { PlayButton } from '@/components/play-button';
import { SliderControl } from '@/components/slider-control';
import { TestSlider } from '@/components/test-slider';
import { ThemeToggle } from '@/components/theme-toggle';
import { useSortingAlgorithmContext } from '@/context/visualizer-context';
import { ALGORITHMS, sortingAlgorithmsData } from '@/lib/constants';
import { SortingAlgorithmType } from '@/lib/types';
import { generateAnimationArray } from '@/lib/utils';

export default function Home() {
    const {
        array,
        isRunning,
        speed,
        setSpeed,
        algorithm,
        setAlgorithm,
        requiresReset,
        resetArrayAnimation,
        runAnimation,
    } = useSortingAlgorithmContext();

    const handleSelectChange = (value: SortingAlgorithmType) => {
        setAlgorithm(value);
    };

    const handlePlay = () => {
        if (requiresReset) {
            resetArrayAnimation();
            return;
        }

        // If the animation doesnt require a reset, then start the animation & generate the array
        generateAnimationArray(algorithm, isRunning, array, runAnimation);
    };

    return (
        <div className='mx-auto h-full max-w-6xl px-4'>
            <div className='flex h-16 items-center justify-between'>
                <h1 className='hidden text-2xl font-light md:flex'>Sorting Visualizer</h1>
                <div className='flex items-center gap-2'>
                    <SliderControl
                        value={speed}
                        onChange={e => setSpeed(e.target.value as unknown as number)}
                        disabled={isRunning}
                    />
                    <AlgorithmSelect
                        options={ALGORITHMS}
                        defaultValue={algorithm}
                        onChange={handleSelectChange}
                        isDisabled={isRunning}
                    />
                    <PlayButton
                        onClick={handlePlay}
                        requiresReset={requiresReset}
                    />
                    <ThemeToggle />
                </div>
            </div>

            <CardWrapper
                title={sortingAlgorithmsData[algorithm].title}
                description={sortingAlgorithmsData[algorithm].description}
                worst={sortingAlgorithmsData[algorithm].worstCase}
                average={sortingAlgorithmsData[algorithm].averageCase}
                best={sortingAlgorithmsData[algorithm].bestCase}
            />

            <div
                id='content-container'
                className='flex items-end justify-center border-b pt-4'
            >
                {array.map((value, index) => (
                    <div
                        key={index}
                        className='array-line default-line-color mx-0.5 w-1 rounded-lg opacity-70 shadow-lg'
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
