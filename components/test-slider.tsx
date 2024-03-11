import { Slider } from '@/components/ui/slider';

type TestSliderProps = {
    value: number[];
    onChange: (value: number[]) => void;
    disabled: boolean;
}

export const TestSlider = ({value, onChange, disabled}: TestSliderProps) => {
    return <Slider defaultValue={[33]} max={100} step={1} value={value} onValueChange={onChange} />

};
