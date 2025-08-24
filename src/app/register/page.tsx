'use client'

import { ChangeEvent, useState } from "react";
import Button from "../components/Button";
import { Card } from "../components/Card";
import Input from "../components/Input";
import Label from "../components/Label";
import { useRouter } from "next/navigation";
import { Group } from "../components/Group";
import Link from "next/link";
import { apiFetch } from "../lib/clientApi";


export default function Login() {

    // hook | manages routing
    const router = useRouter();

    // holds form data
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    })

    const Register = async () => {

        // preparing payload
        const payload = {
            email: formData.email,
            username: formData.username,
            password: formData.password
        };

        try{
            await apiFetch('POST', 'register/', (res: { user_id?: string }) => {
                if(res?.user_id){
                    router.push('/login')
                }
            }, payload)

        }
        catch(error){
            console.error(error)
        }


    }


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
            className = 'w-full h-full flex justify-center items-center'
        >
            <div
                className="h-fit p-4 w-8/12 sm:w-6/12 md:w-4/12 lg:w-3/12"
            >
                <Card>
                    <Group>
                        <Label>Email</Label>
                        <Input
                            value={formData.email}
                            onChange={(e) => handleInput('email', e)}
                            onBlur={(e) => handleInput('email', e)}
                            type="text"
                        />
                    </Group>

                    <Group>
                        <Label>Username</Label>
                        <Input
                            value={formData.username}
                            onChange={(e) => handleInput('username', e)}
                            onBlur={(e) => handleInput('username', e)}
                            type="text"
                        />
                    </Group>

                    <Group>
                        <Label>Password</Label>
                        <Input
                            value={formData.password}
                            onChange={(e) => handleInput('password', e)}
                            onBlur={(e) => handleInput('password', e)}
                            type="password"
                        />
                    </Group>

                    <Group>
                        <Button
                            onClick={() => Register()}
                        >
                            Register
                        </Button>

                        <Link href={'/login'} className="w-full h-full flex justify-center text-xs">
                            Already have an account?
                        </Link>
                    </Group>
                </Card>
            </div>
        </div>
    );
}
