import React, { useEffect } from 'react';

export default function Toast({ message, type = 'error', onClose, duration = 2000 }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
            <div className={`rounded-lg px-4 py-3 shadow-lg ${
                type === 'error' ? 'bg-red-500' : 'bg-green-500'
            } text-white`}>
                <div className="flex items-center space-x-2">
                    {type === 'error' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                    <span>{message}</span>
                </div>
            </div>
        </div>
    );
}