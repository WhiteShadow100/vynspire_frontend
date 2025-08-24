"use server"

import { cookies } from "next/headers";


export async function apiFetch(type: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, payload?: object) {
    try{
        const apiUrl = process.env.NEXT_PUBLIC_URL;

        const cookie = await cookies()
        const token = cookie.get("token")?.value;


        const res = await fetch(`${apiUrl}${path}`, {
            method: type,
            headers: {
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${JSON.parse(token)}` })
            },
            cache: "no-store",
            body: payload == null ? undefined : JSON.stringify(payload)
        });

        if (!res.ok) {
            let errorMessage = `Error ${res.status}: ${res.statusText}`;

            try {
                const errorBody = await res.json();
                errorMessage = errorBody.message || errorMessage;
            } catch {
            }

            throw new Error(errorMessage);
        }

        return res.json();
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
}