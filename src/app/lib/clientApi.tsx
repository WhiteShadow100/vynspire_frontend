'use client'

import Cookies from "js-cookie"
import { toast } from "react-toastify";

export function apiFetch<T>(type: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, callback?: (data: T) => void, payload?: object) {
    try{
        const apiUrl = process.env.NEXT_PUBLIC_URL;

        const token = Cookies.get("token");

        fetch(`${apiUrl}${path}`, {
            method: type,
            headers: {
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${JSON.parse(token)}` })
            },
            cache: "no-store",
            body: payload == null ? undefined : JSON.stringify(payload)
        }).then(async (res) => {
            const data = await res.json().catch(() => null);

            if (!res.ok) {
                const errorMessage = data?.error || res.statusText || "Something went wrong";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }

            return data as T;
        })
        .then((data: T) => {
            // passing data to callback
            if(callback){
                callback(data)
            }
        })
    }
    catch(error){
        console.log("GET request failed:", error);
        throw error;
    }
}