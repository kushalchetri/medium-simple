import {useEffect, useState} from "react"
import axios from "axios";
import { BACKEND_URL } from "../pages/config";

 export interface Blog{
    id:string,
    title:string,
    content:string,
    author:{
        name:string
    }
}

export const useBlogs = ()=>{
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((response) =>{
            return (setBlogs(response.data),setLoading(false));
        })
    },[])

    return {
        loading,
        blogs
    }
}

export const useBlog = ({id}:{id:string})=>{
    const [blog,setBlog] = useState<Blog>()
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then((response)=>{
            return (setBlog(response.data),setLoading(false));
        })
    },[id])

    return{
        loading,
        blog
    }
}