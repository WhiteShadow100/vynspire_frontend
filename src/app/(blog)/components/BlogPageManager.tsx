'use client'

import { TextButton } from "@/app/components/Button"
import BlogList from "./BlogList";
import { useEffect, useState } from "react";
import BlogEditor from "./BlogEditor";
import { useRouter, useSearchParams } from "next/navigation";
import { List, PlusCircle } from "lucide-react";
import { Group } from "@/app/components/Group";
import { IBlog } from "../page";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";


export default function BlogPageManager({ blogList }: { blogList: IBlog[]}){

    const searchParams = useSearchParams();

    const router = useRouter();

    const initialPage = Number(searchParams.get("p") || 1);

    // holds the page to be shown 
    const [pageQuery, setPageQuery] = useState<number>(initialPage);

    // holds updating blog id
    const[updateId, setUpdateId] = useState<number>(0)

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);


    useEffect(() => {
        if(pageQuery){
            const params = new URLSearchParams(searchParams.toString());
            params.set('p', ''+pageQuery);
            router.push(`?${params.toString()}`, { scroll: false });
        }
    }, [pageQuery, router, searchParams])

    return (
        <>
            <Group className="w-full h-1/12 flex">
                <div className="flex gap-3">
                    <TextButton
                        title="List Page"
                        onClick={() => {
                            setPageQuery(1)
                        }}
                    >
                        <List size={17} />
                    </TextButton>

                    {
                        isLoggedIn ? (
                            <TextButton
                                title="New"
                                onClick={() => {
                                    setPageQuery(2)
                                }}
                            >
                                <PlusCircle size={17} />
                            </TextButton>                    
                        ) : (
                            <></>
                        )
                    }
                </div>
            </Group>

            <hr />

            <Group className="w-full h-11/12">
                {
                    pageQuery == 2 ?(
                        <BlogEditor setPageQuery={setPageQuery} updateId={updateId} />
                    ) : (
                        <BlogList setPageQuery={setPageQuery} setUpdateId={setUpdateId} blogList={blogList}/>                        
                    )
                }
            </Group>
        </>
    )
}