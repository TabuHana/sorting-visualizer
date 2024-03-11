import { Button } from './ui/button';

import { StepForwardIcon, RefreshCcwIcon } from 'lucide-react';

type PlayButtonProps = {
    onClick: () => void;
    requiresReset: boolean;
};

export const PlayButton = ({ onClick, requiresReset }: PlayButtonProps) => {
    return (
        <Button
            size='sm'
            onClick={onClick}
        >
            {requiresReset ? <RefreshCcwIcon className='h-5 w-5' /> : <StepForwardIcon className='h-5 w-5' />}
        </Button>
    );
};
