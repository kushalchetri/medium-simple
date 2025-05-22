import type { Blog } from "../../hooks"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{blog:Blog})=>{
    return<div className="flex justify-content">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl ">
        <div className="col-span-8 flex-col w-120 pt-9">
            <div className="text-3xl font-bold">
                {blog.title}
            </div>
            <div className="text-xs">
                <div className="text-gray-500 pt-1">
                Post on 21nd may 2025
                </div>
                <div className="pt-2">
                {blog.content}
                 </div>
            </div>
        </div>
        <div className="col-span-4 pt-9 text-xs">
            <div className="pb-2">
                Author
            </div>
            <Avatar name={blog.author.name==null?"Anonymous":blog.author.name} size="small"/>
            {blog.author.name==null?"Anonymous":blog.author.name}
            <div className="pt-2">
                Random catch phrase about the author's ability to grab the user's attention
            </div>
    </div>
    </div>
    </div>
}