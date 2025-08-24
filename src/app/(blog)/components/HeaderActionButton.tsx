'use client'

import Button from "@/app/components/Button";
import { AppDispatch, RootState } from "@/app/store";
import { logout } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderActionButton(){

    const router = useRouter();

    // hook | getting value from redux
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    // hook | updating redux value
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="flex items-center justify-end align-middle w-full h-full">
            <div className=" w-1/12 h-8">
                {
                    isLoggedIn ? (
                        <Button
                            onClick={() => {
                                dispatch(logout());
                                router.push(`/login`);
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                router.push(`/login`);
                            }}
                        >
                            Login
                        </Button>
                    )
                }
            </div>
        </div>
    )
}