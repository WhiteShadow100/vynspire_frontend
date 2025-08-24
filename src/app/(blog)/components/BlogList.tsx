import { Card } from "@/app/components/Card";
import { TextButton } from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { BookOpenText, Edit3, Trash } from "lucide-react";
import { Group } from "@/app/components/Group";
import Link from "next/link";
import { IBlog } from "../page";
import { apiFetch } from "@/app/lib/serverApi";

export default function BlogList({ blogList, setPageQuery, setUpdateId }: { blogList: IBlog[], setPageQuery: Dispatch<SetStateAction<number>>, setUpdateId: Dispatch<SetStateAction<number>> }){
    
    const router = useRouter();

    return (
        <div
            className = 'w-full h-full gap-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        >
            {
                blogList.length > 0 ? (
                    blogList.map((blog, index) => (
                        <div key={index} className="w-full max-h-24">
                            <Card>
                                <Group className="flex justify-between">
                                    <div className="font-bold truncate">
                                        {blog.title}                                
                                    </div>
    
                                    <div className="flex gap-2">                                        
                                        <div className="w-fit h-fit">
                                            <TextButton
                                                title="Delete"
                                                onClick={async () => {
                                                    await apiFetch('DELETE', `posts/${blog.id}/`)
                                                    router.refresh()
                                                }}
                                            >
                                                <Trash size={17} />
                                            </TextButton>
                                        </div>  
    
                                        <div className="w-fit h-fit">
                                            <TextButton
                                                title="Edit"
                                                onClick={() => {
                                                    setUpdateId(blog.id);
                                                    setPageQuery(2);
                                                }}
                                            >
                                                <Edit3 size={17} />
                                            </TextButton>
                                        </div>
                                    </div>
                                </Group>
    
                                <hr />
    
                                <div className="mt-2 flex justify-end text-xs">
                                    <Link href={`/${blog.id}`} className="flex gap-1.5">
                                        <BookOpenText size={17} /> Read More {'>>'}
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div className="font-bold">
                        Sorry, Not Post Found
                    </div>
                )
            }
        </div>
    )
}