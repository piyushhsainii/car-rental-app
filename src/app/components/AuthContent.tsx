import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { GithubIcon } from 'lucide-react';

const AuthContent = () => {
    const session = useSession()

  return (
    <div>
        <div className=''>
                <div className='text-slate-800 text-sm  bg-white' onClick={() => signIn("github")} >
                   <div className='flex'>
                     <div className='border-slate-700 border p-2'><GithubIcon /></div>
                      <div className='p-2 text-center items-center flex iy'>SIGN IN USING GITHUB</div> </div>
                </div>
              <div>
                <button className='text-slate-800 text-sm' onClick={() => signIn("discord")} >
                <div className='flex'> <div><img src='/discord.png' width={20} ></img></div> <div>SIGN IN USING DISCORD</div> </div>
                </button>
              </div>
          </div>
    </div>
  )
}

export default AuthContent