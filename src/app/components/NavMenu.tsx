"use client"
import { signIn, signOut , useSession   } from "next-auth/react";

const NavMenu =() => {    
    const session = useSession()
    console.log(session)
    if(session.data !== null)
   { return (  
        <div>
            <p> {session?.data?.user?.name} </p>
            <p> <img src={session?.data?.user?.image ?? ""} alt="pfp" /> </p>
            <button onClick={()=> signOut()} >SIGNOUT</button>
        </div>
    ) } else {
        return (  
            <div>
                <button onClick={()=> signIn("github")} >SIGN IN</button>
            </div>
        )
    }
}
 
export default NavMenu;