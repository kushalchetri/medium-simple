import { Appbar } from "../assets/components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "./config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getuser } from "./Blogs"

export const Publish = ()=>{
    const[title,setTitle] = useState('');
    const[content,setContent] = useState('');
    const navigate = useNavigate();
    const user = getuser(); 
    return <div>
        <Appbar name={user}/>
        <div className="flex justify-center pt-4">
            <div className="flex flex-col"> 
                <textarea onChange={(e)=>{
                    setTitle(e.target.value)
                }} className="block h-8 pt-1 w-sm text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Title"></textarea>
                <textarea onChange={(e)=>{
                    setContent(e.target.value)
                }} className="block mt-1 h-50 w-sm text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Write an artical"></textarea>
                <div className="w-sm border border-gray-300 h-7 rounded-md">
                <button onClick={async()=>{
                    const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content
                    },{
                        headers:{
                            Authorization:localStorage.getItem("token")
                        }
                    })
                    navigate(`/blog/${res.data.id}`)
                }} className="bg-blue-600 text-white h-7 w-[90px] flex justify-center pt-1 text-sm rounded-md">Publish Post</button>
                </div>
            </div>
        </div>
    </div>
}