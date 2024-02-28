"use client"
import { CircleUser } from "lucide";
import { signIn, signOut , useSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Switch } from "@/components/ui/switch"

const NavMenu =() => {    
    const session = useSession()
    console.log(session)
    return (
        <div className="flex bg-red-300 h-[60px] " >
            <div>
                <Image src={'/Logo.png'} className=" mix-blend-multiply" width={180} height={60} alt="logo"></Image>
            </div>
            {
                session.data === null ? 
                <div>
                    <Switch />
                    <Link href={'/Auth'} ><Image src={'/circle-user.png'} alt="avatar" width={30} height={30} ></Image></Link>
                </div> 
                 : 
                 <div>
                    <Switch />
                    <div> {session?.data?.user?.name} </div>
                    <div> <img src={session?.data?.user?.image ?? ""} width={30} height={30}  alt="pfp"/> </div>
                    <button onClick={()=> signOut()} >SIGNOUT</button>
             </div>
            }   
        </div>  
    )
   
}
 
export default NavMenu;