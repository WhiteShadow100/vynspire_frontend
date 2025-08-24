'use client'

import { ChangeEvent, useState } from "react";
import Button, { TextButton } from "../components/Button";
import { Card } from "../components/Card";
import Input from "../components/Input";
import Label from "../components/Label";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { login } from "../store/slices/authSlice";
import { Group } from "../components/Group";
import Link from "next/link";
import { apiFetch } from "../lib/clientApi";


export default function Login() {

    // hook | manages routing
    const router = useRouter();

    // hook | updating redux value
    const dispatch = useDispatch<AppDispatch>();

    // holds form data
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const Login = async () => {

        // preparing payload
        const payload = {
            username: formData.username,
            password: formData.password
        };

        try{
            apiFetch('POST', 'login/', (res: { token?: string }) => {
                if(res?.token){
                    dispatch(login({ token: res?.token }));
                    router.push('/')
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
                            onClick={() => Login()}
                        >
                            Login
                        
                        </Button>

                        <TextButton>
                            <Link href={'/register'} className="w-full h-full flex justify-center text-xs">
                                Create new account
                            </Link>
                        </TextButton>
                    </Group>
                </Card>
            </div>
        </div>
    );
}
