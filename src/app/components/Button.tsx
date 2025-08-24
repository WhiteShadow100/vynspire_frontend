'use client'

import { MouseEventHandler } from "react"

export default function Button ({children, onClick}:{children:React.ReactNode, onClick?: MouseEventHandler}) {
    return (
        <button
            className="w-full h-full cursor-pointer rounded border-2 "
            onClick={onClick}
        >
            {children}
        </button>
    )
}


export function TextButton ({children, title, onClick}:{children:React.ReactNode, title?: string, onClick?: MouseEventHandler}){
    return (
        <button 
            className="w-full h-full cursor-pointer"
            onClick={onClick}
            title={title ? title : ""}
        >
            {children}
        </button>
    )
}