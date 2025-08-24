import React, { ReactNode } from "react";

export default function Label({children}:{children: React.ReactNode}){
    return(
        <span
            className="w-full h-full text-xs font-bold tracking-wide"
        >
            {children}
        </span>
    )
}