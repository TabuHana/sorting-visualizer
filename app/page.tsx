'use client';

import { Select } from '@/components/select';
import { SliderControl } from '@/components/slider-control';
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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAlgorithm(e.target.value as SortingAlgorithmType);
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
        <div className='absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'>
            <div className='flex h-full justify-center'>
                <div
                    id='content-container'
                    className='flex w-full max-w-[1020px] flex-col px-4 lg:px-0'
                >
                    <div className='relative flex h-[66px] w-full items-center justify-between'>
                        <h1 className='hidden text-2xl font-light md:flex'>Sorting Visualizer</h1>
                        <div className='flex gap-2'>
                            <SliderControl
                                value={speed}
                                onChange={e => setSpeed(e.target.value as unknown as number)}
                                disabled={isRunning}
                            />
                            <Select
                                options={ALGORITHMS}
                                defaultValue={algorithm}
                                onChange={handleSelectChange}
                                isDisabled={isRunning}
                            />
                            <button
                                className='flex items-center justify-center'
                                onClick={handlePlay}
                            >
                                {requiresReset ? 'Reset' : 'Start'}
                            </button>
                        </div>
                        <div className='absolute left-0 top-[120%] hidden w-full sm:flex'>
                            <div className='flex w-full gap-6 rounded border p-4 text-gray-400'>
                                <div className='flex w-3/4 flex-col items-start justify-start'>
                                    <h3 className='text-lg'>{sortingAlgorithmsData[algorithm].title}</h3>
                                    <p className='text-grey-500 pt-2 text-sm'>
                                        {sortingAlgorithmsData[algorithm].description}
                                    </p>
                                </div>
                                <div className='flex w-1/4 flex-col items-start justify-start gap-2'>
                                    <h3 className='text-lg'>Time Complexity</h3>
                                    <div className='flex flex-col gap-2'>
                                        <p className='flex w-full text-sm text-gray-500'>
                                            <span className='w-28'>Worst Case:</span>
                                            <span>{sortingAlgorithmsData[algorithm].worstCase}</span>
                                        </p>
                                        <p className='flex w-full text-sm text-gray-500'>
                                            <span className='w-28'>Average Case:</span>
                                            <span>{sortingAlgorithmsData[algorithm].averageCase}</span>
                                        </p>
                                        <p className='flex w-full text-sm text-gray-500'>
                                            <span className='w-28'>Best Case:</span>
                                            <span>{sortingAlgorithmsData[algorithm].bestCase}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative h-[calc(100vh-66px)] w-full'>
                        <div className='absolute bottom-[32px] left-0 right-0 mx-auto flex w-full items-end justify-center'>
                            {array.map((value, index) => (
                                <div
                                    key={index}
                                    className='array-line default-line-color relative mx-0.5 w-1 rounded-lg opacity-70 shadow-lg'
                                    style={{ height: `${value}px` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
