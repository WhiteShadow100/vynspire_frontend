import React from "react";

export function Card({children, className}: {children: React.ReactNode, className?: string}){
    return (
        <div className={`w-full h-full border-2 rounded-lg bg-white border-gray-100 p-2 ' ${className ? className : ''}`}>
            {children}
        </div>
    )
}