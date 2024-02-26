import { SelectOptionsType } from '@/lib/types';

export const Select = ({
    options,
    defaultValue,
    onChange,
    isDisabled = false,
}: {
    options: SelectOptionsType[];
    defaultValue: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    isDisabled?: boolean;
}) => {
    return (
        <div className='relative inline-block w-48'>
            <select
                className='block h-8 w-full appearance-none rounded-lg border border-blue-300 bg-blue-500 px-4 py-1 pr-8 leading-tight shadow focus:outline-none '
                value={defaultValue}
                onChange={onChange}
                disabled={isDisabled}
            >
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
