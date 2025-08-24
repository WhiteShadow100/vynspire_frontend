import { Card } from "@/app/components/Card";
import { IBlogDetail } from "../page";
import { Group } from "@/app/components/Group";


export default function BlogDetailView({ blogDetail } : { blogDetail: IBlogDetail}){

    return (
        <div className="w-full h-full p-6">
            <Card>
                <Group className="w-full h-1/12">
                    <div className="font-bold">
                        {blogDetail.title}
                    </div>
                </Group>

                <hr />

                <Group className="w-full h-10/12">
                    <div className="overflow-scroll w-full h-full">
                        {blogDetail.content}
                    </div>
                </Group>

                <hr />

                <Group className="w-full h-1/12">
                    <div className="text-xs font-light">
                        {blogDetail.author__username} | {(new Date(blogDetail.created_at).toDateString()) || ""}
                    </div>
                </Group>
            </Card>
        </div>
    );
}