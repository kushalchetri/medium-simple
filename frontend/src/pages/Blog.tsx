import { FullBlog } from "../assets/components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { Appbar } from "../assets/components/Appbar";
import { Spinner } from "../assets/components/Spinner";

export function Blog(){
    const {id} = useParams();
    const {blog,loading} = useBlog({id:id||""});
    if(loading || !blog){
        return<div className="flex justify-center items-center h-screen">
            <div className="fle">
                <Spinner/>
            </div>
        </div>
    }

    return <div>
        <Appbar name={blog.author.name}/>
        <FullBlog blog={blog}/>
    </div>
}