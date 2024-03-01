"use client"
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignOut = () => {
  return (
       <button onClick={()=> signOut()} >
            <div className="flex"> <div> <LogOut width={18} /></div> <div> Sign Out</div></div>
        </button>   
  )
}

export default SignOut