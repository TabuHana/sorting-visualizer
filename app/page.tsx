'use client';

import { SliderControl } from '@/components/slider-control';
import { Slider } from '@/components/ui/slider';
import { useSortingAlgorithmContext } from '@/context/visualizer-context';
import { useContext, useEffect } from 'react';

export default function Home() {
    const { array, isRunning, speed, setSpeed } = useSortingAlgorithmContext();

    useEffect(() => {
        console.log(speed);
    }, [speed]);

    return (
        <div className='absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'>
            <div className='flex h-full justify-center'>
                <div
                    id='content-container'
                    className='flex w-full max-w-[1020px] flex-col px-4 lg:px-0'
                >
                    <div className='relative flex h-[66px] w-full items-center justify-between'>
                        <h1 className='hidden text-2xl font-light md:flex'>Sorting Visualizer</h1>
                        <div>
                            <SliderControl
                                value={speed}
                                onChange={e => setSpeed(e.target.value as unknown as number)}
                                disabled={isRunning}
                            />

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
