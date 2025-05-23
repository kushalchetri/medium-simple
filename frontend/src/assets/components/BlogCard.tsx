import { Link } from "react-router-dom"

interface BlogCardProps{
    id:string,
    authorName:string,
    title:string,
    content:string,
    publishedDate:string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps)=>{
    return <div className="flex justify-center">
    <div className="flex flex-col items-start h-45 scale-y-70 scale-x-72 m-[-32px] w-120 p-4 border-solid border-b border-b-gray-300">
        <Link to={`/blog/${id}`}>
        <div className="flex flex-row">
            <Avatar name={authorName} size="small" /> {authorName} <CircleDot/>
            <div className="text-gray-500">
            {publishedDate}
            </div>
        </div>
        <div className="font-bold text-xl">
            {title}
        </div>
        <div className="text-xs">
            {content.length > 100 ? content.slice(0,100)+"...": content}
        </div>
        <div>
            {`${Math.ceil(content.length/100)} min read`}
        </div>
        </Link>
    </div>
    </div>
}

export function Avatar({name,size}:{name:string,size:"big"|"small"}){
    return <div className={`relative inline-flex items-center justify-center mr-1 ${size==="small"?"w-6 h-6":"w-7 h-7"} overflow-hidden bg-gray-600 rounded-full dark:bg-gray-800`}>
    <span className="font-medium text-white dark:text-gray-300">{name[0].toUpperCase()}</span>
    </div>
}

function CircleDot(){
    return <div className="h-[2px] w-[2px] ml-1 mr-1 solid bg-gray-500 rounded-4xl mt-3"></div>
}