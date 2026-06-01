// A React component that displays a loading spinner overlay when the application is in a loading state, 
// using context to determine whether to show the loader or not.
import React from 'react';
import { useLoading } from '../contexts/LoadingContext';

const Loader = () => {
    const context = useLoading();
    const isLoading = context?.isLoading;
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30" aria-hidden={!isLoading}>
            <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-blue-500 border-opacity-25"></div>
                <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-t-blue-500 border-transparent" style={{ animationDuration: '1.5s' }}></div>
            </div>
        </div>
    );
};

export default Loader;