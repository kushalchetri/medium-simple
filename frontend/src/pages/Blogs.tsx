import { Appbar } from "../assets/components/Appbar"
import { BlogCard } from "../assets/components/BlogCard"
import {jwtDecode} from "jwt-decode"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../assets/components/BlogSkeleton";

 export function getuser():string{
        const token = localStorage.getItem("token")
    if(token){
        const decode = jwtDecode(token) as {name:string,id:string}|null;
        if(decode){
            return decode?.name ?? "Guest"
        }
        return "Guest";
    }
    return "Guest"
}

export function Blogs(){
    const {loading,blogs} = useBlogs();

    const userName = getuser()

    if(loading){
        return <div className="flex flex-col">
            <div><Appbar name={userName}/></div>
            <div className="flex items-center justify-center"><BlogSkeleton/></div>
            
        </div>
    }

    const date = new Date();
    const currentdate = `${date.getDate()} ${date.getMonth()+1} ${date.getFullYear()}`

    return <>
    <Appbar name={userName}/>
    {blogs.map((blog)=>{
        return <BlogCard id={blog.id} authorName={blog.author.name===null?"Anonymous":blog.author.name} title={blog.title} content={blog.content} publishedDate={currentdate}/>
    })}
    </>
}
