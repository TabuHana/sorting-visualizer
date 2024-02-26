'use client';

import { useSortingAlgorithmContext } from '@/context/visualizer-context';
import { useContext, useEffect } from 'react';

export default function Home() {
    const { array, isRunning } = useSortingAlgorithmContext();

    useEffect(() => {
        console.log(array);
        console.log(isRunning);
    }, []);

    return (
        <div className='absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'>
            <div className='flex h-full justify-center'>
                <div id='content-container' className='flex w-full max-w-[1020px] flex-col px-4 lg:px-0'>
                  <div className='h-[66px] relative flex items-center justify-center w-full'>
                    <h1 className='text-gray-300 text-2xl font-light hidden md:flex'>Sorting Visualizer</h1>
                    <div>Controls</div>
                  </div>
                </div>
            </div>
        </div>
    );
}
