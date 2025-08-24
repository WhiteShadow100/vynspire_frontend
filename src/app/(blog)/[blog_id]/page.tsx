import { apiFetch } from "@/app/lib/serverApi";
import BlogDetailView from "./component/BlogDetailView";

export interface IBlogDetail {
    id: number,
    title: string,
    content: string,
    created_at: Date,
    author__username: string
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ blog_id: string }>
}) {
    const { blog_id } = await params;

    const parsed_blog_id = Number(blog_id);

    // getting blog detail
    const blogDetail: IBlogDetail = await apiFetch("GET", `posts/${parsed_blog_id}/`)

    return (
        <BlogDetailView blogDetail={blogDetail} />
    );
}