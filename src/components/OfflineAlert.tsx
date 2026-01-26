'use client';

import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineAlert() {
    const [isOnline, setIsOnline] = useState(true);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            setTimeout(() => setShowAlert(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowAlert(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline && !showAlert) {
        return null;
    }

    return (
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg border transition-all duration-300 ${isOnline
                ? 'bg-green-50 dark:bg-green-950 border-green-500 text-green-900 dark:text-green-100'
                : 'bg-red-50 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-100'
                }`}
        >
            <div className="flex items-center gap-3">
                {isOnline ? (
                    <Wifi className="h-5 w-5" />
                ) : (
                    <WifiOff className="h-5 w-5 animate-pulse" />
                )}
                <p className="font-medium">
                    {isOnline
                        ? 'Connection restored!'
                        : 'No internet connection. Some features may be unavailable.'}
                </p>
            </div>
        </div>
    );
}
