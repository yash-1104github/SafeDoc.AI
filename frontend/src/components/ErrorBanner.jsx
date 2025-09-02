import React from 'react';
export default function ErrorBanner({ message }) { 
    return (
        <>
        <div className="mt-4 text-red-600">{message}</div>;
        </>
    ) 
}