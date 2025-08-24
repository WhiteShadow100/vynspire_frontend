import { apiFetch } from "../lib/serverApi";
import BlogPageManager from "./components/BlogPageManager";


export interface IBlog {
    id: number,
    title: string,
    content: string
}

export default async function Blog() {

    const blogList: IBlog[] = await apiFetch("GET", "posts/")

    return (
        <BlogPageManager blogList={blogList} />
    );
}
