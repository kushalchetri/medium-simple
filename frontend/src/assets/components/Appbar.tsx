import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = ({name}:{name:string} )=>{

    return<div className="flex justify-between border-b border-b-gray-300 p-1 text-sm cursor-pointer">
        <Link to={'/blogs'}>
        <div className="flex pt-1 items-center">Medium</div>
        </Link>
        <div>
            <Link to={'/publish'}>
            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-4xl text-sm px-3 py-1.5 me-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
            </Link>
            <Avatar name={name==null?"A":name} size="big"/>
        </div>
    </div> 
}