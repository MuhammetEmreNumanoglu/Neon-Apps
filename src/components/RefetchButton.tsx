'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface RefetchButtonProps {
    onRefetch: () => void;
    isRefetching: boolean;
    disabled?: boolean;
}

export function RefetchButton({ onRefetch, isRefetching, disabled }: RefetchButtonProps) {
    return (
        <Button
            onClick={onRefetch}
            disabled={disabled || isRefetching}
            variant="outline"
            className="gap-2"
        >
            <RefreshCw
                className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`}
            />
            {isRefetching ? 'Refetching...' : 'Refresh Data'}
        </Button>
    );
}
