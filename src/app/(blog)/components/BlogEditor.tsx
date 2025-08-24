'use client'

import Button from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import Input from "@/app/components/Input";
import Label from "@/app/components/Label";
import { apiFetch } from "@/app/lib/clientApi";
import { SetStateAction, useState, Dispatch, useEffect, ChangeEvent } from "react";
import { IBlog } from "../page";
import { Group } from "@/app/components/Group";

export default function BlogEditor({setPageQuery, updateId}: {setPageQuery: Dispatch<SetStateAction<number>>, updateId:number}){

    const initialValue = {
        title: '',
        content: ''
    }

    // holds input data
    const [formData, setFormData] = useState(initialValue)

    const Save = () => {
        // preparing payload
        const payload = {
            title: formData.title,
            content: formData.content
        };

        if(updateId && updateId > 0){
            apiFetch('PUT', `posts/${updateId}/`, () => {}, payload);
        }else{
            apiFetch('POST', 'posts/', () => {}, payload);
        }

        setPageQuery(1);
    }

    const Clear = () => {
        setFormData(initialValue)
    }


    function getData(id:number){
        apiFetch<IBlog>("GET", `posts/${id}/`, (res) => {
            setFormData(pre => ({
                ...pre,
                title: res?.title || "",
                content: res?.content || ""
            }))
        })

    }


    useEffect(() => {
        if(updateId > 0){
            getData(updateId);            
        }
    }, [updateId])

    
    function handleInput(label:string, event: ChangeEvent<HTMLInputElement>){
    
        let { value } = event?.target;
        value = value || "";

        setFormData(pre => ({
            ...pre,
            [label]: value
        }))
    }


    return (
        <div
            className = 'w-full h-full p-5'
        >
            <Card className="p-3">
                <Group>
                    <Label>Title</Label>
                    <Input 
                        value={formData.title}
                        onChange={(e) => handleInput('title', e)}
                        onBlur={(e) => handleInput('title', e)}
                    />
                </Group>

                <Group>
                    <Label>Content</Label>
                    <Input 
                        value={formData.content}
                        onChange={(e) => handleInput('content', e)}
                        onBlur={(e) => handleInput('content', e)}
                    />
                </Group>
                
                <Group className="flex gap-3 justify-end">
                    <div className="w-1/12">
                        <Button onClick={() => {
                            Save()
                        }}>
                            Save
                        </Button>
                    </div>

                    <div className="w-1/12">
                        <Button onClick={() => {
                            Clear()
                        }}>
                            Clear
                        </Button>
                    </div>
                </Group>
            </Card>
        </div>
    )
}