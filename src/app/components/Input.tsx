'use client'

import { ChangeEventHandler, FocusEventHandler } from "react"

export default function Input({
    type,
    onChange,
    onBlur,
    value
}: {
    type?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onBlur?: FocusEventHandler<HTMLInputElement>,
    value?: string | number | undefined
}){
    return (
        <input
            className="w-full h-full border-2 rounded-md outline-none p-1 text-sm"
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            value={value}
        />
    )
}