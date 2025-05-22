import { useState, type ChangeEvent } from "react";
import type { SignupInput } from "@kushalchetri/common-blog";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../pages/config";

export function Auth({type}:{type: "signup"|"signin"}){
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        email:"",
        name:"",
        password:""
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        }catch(e){
            if(type=="signin"){
                return alert("eror while loggin in")
            }else{
                return alert("error while creating user")
            } 
        }
        
    }
    return <div className="flex justify-center items-center flex-col">
        <div className="text-2xl font-bold">
            Create an account
        </div>
        <div className="text-xs mb-4">
            {type === "signin"?"Don't have an account":"Already have an account? "}
        <Link className="underline" to={type === "signup"?"/signin":"/signup"}>{type==="signin"?"SignUp":"Signin"}</Link>
        </div>
        <div>
            {type === "signup"? <LabelledInput label="Name" type="text" placeholder="Enter your name" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                });
            }} />:null}
        </div>
        <div>
            <LabelledInput label="Email" type="text" placeholder="m@example.com" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    email:e.target.value
                });
            }} />
        </div>
        <div>
            <LabelledInput label="Password" type="password" placeholder="" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password:e.target.value
                });
            }} />
        </div>
        <button onClick={sendRequest} className="bg-black rounded-sm text-white w-[230px]" type="button">{type == "signup"? "Sign Up": "Sign in"}</button>
    </div>
}

interface LabelledInputType{
    label:string,
    placeholder:string,
    type:string,
    onChange:(e: ChangeEvent<HTMLInputElement>)=> void
}

function LabelledInput({label,type,placeholder,onChange}:LabelledInputType){
    return <div className="h-[70px]">
        <label>{label}</label>
        <div>
        <input className="w-[230px] border border-gray-400 rounded-sm mt-1 pl-3 focus:border-blue-600 outline-none" type={type} placeholder={placeholder} onChange={onChange}></input>
        </div>
    </div>
}