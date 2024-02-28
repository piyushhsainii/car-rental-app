"use client"
import { signIn, signOut, useSession } from "next-auth/react";

const Auth = () => {
    const session = useSession()
    return (
        <div>
            <div>
                <button onClick={() => signIn("github")} >SIGN IN USING GITHUB </button>
                <button onClick={() => signIn("discord")} >SIGN IN USING DISCORD</button>
            </div>
        </div>
    )
}

export default Auth