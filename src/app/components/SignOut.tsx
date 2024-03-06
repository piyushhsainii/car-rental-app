"use client"
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const SignOut = () => {
  const session = useSession()
  return (
    session.data ? 
       <button onClick={()=> signOut()} >
            <div className="flex"> <div> <LogOut width={18} /></div> <div> Sign Out</div></div>
        </button>   : null
  )
}

export default SignOut