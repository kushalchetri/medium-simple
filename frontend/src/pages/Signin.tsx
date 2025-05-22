import { Quote } from "../assets/components/Quote"
import { Auth } from "../assets/components/Auth"

export function Signin(){
    return <div className="grid grid-cols-1 sm:grid-cols-2">
        <Auth type="signin"/>        
        <div className="hidden sm:block">
        <Quote/>
        </div>
    </div>
}