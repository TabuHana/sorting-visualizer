import { SelectOptionsType, SortingAlgorithmType } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const AlgorithmSelect = ({
    options,
    defaultValue,
    onChange,
    isDisabled = false,
}: {
    options: SelectOptionsType[];
    defaultValue: string;
    onChange: (value: SortingAlgorithmType) => void;
    isDisabled?: boolean;
}) => {
    return (
        <Select
            defaultValue={defaultValue}
            onValueChange={onChange}
            disabled={isDisabled}
        >
            <SelectTrigger className='w-48'>
                <SelectValue
                    defaultValue={defaultValue}
                    placeholder='Algorithm Select'
                />
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
