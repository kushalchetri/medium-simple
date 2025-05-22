import { Quote } from "../assets/components/Quote"
import { Auth } from "../assets/components/Auth"

export function Signup(){
    return <div className="grid grid-cols-1 sm:grid-cols-2">
        <Auth type="signup"/>        
        <div className="hidden sm:block">
        <Quote/>
        </div>
    </div>
}