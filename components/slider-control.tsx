import { Slider } from '@/components/ui/slider';
import { MAX_ANIMATION_SPEED, MIN_ANIMATION_SPEED } from '@/lib/constants';

export const SliderControl = ({
    min = MIN_ANIMATION_SPEED,
    max = MAX_ANIMATION_SPEED,
    step = 10,
    value,
    onChange,
    disabled = false,
}: {
    min?: number;
    max?: number;
    step?: number;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
}) => {
    return (
        <div className='flex items-center justify-center gap-2'>
            <span className='text-center'>Slow</span>
            <input
                type='range'
                min={min}
                max={max}
                step={1}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-pink-200'
            />
            <span className='text-center'>Fast</span>
        </div>
    );
};
