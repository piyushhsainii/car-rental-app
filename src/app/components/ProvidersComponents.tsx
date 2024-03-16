'use client'
import React from 'react'
import { signIn, signOut } from "next-auth/react";
import { GithubIcon } from 'lucide-react';

const ProvidersComponents = () => {
  return (
    <div className='w-[35vw] min-w-[400px] py-20 pb-16 rounded-lg  mt-8 m-auto bg-slate-700   p-4 flex flex-col items-center justify-center gap-4'>
               
                <div className='w-[100%] m-auto hover:scale-[1.14] transition-all duration-300  text-slate-800  rounded-md border-slate-700 border text-sm  bg-white cursor-pointer' onClick={() => signIn("github")} >
                    <div className='flex justify-center  '>
                        <div className='border-slate-700 border-r p-5  '><GithubIcon /></div>
                        <div className=' w-[100%]  bg-slate-800  text-white font-semibold text-center items-center flex justify-center text-md'>SIGN IN USING GITHUB</div> </div>
                </div>
                <div className='w-[100%] m-auto hover:scale-[1.14] transition-all duration-300 text-slate-800 j text-sm  rounded-md border-slate-700 border bg-white cursor-pointer' onClick={() => signIn("discord")} >
                    <div className='flex justify-center '>
                        <div className='border-slate-700 border-r p-5 '><img src='/discord.png' width={20} ></img></div>
                        <div className=' w-[100%] py-3  bg-slate-800 text-white  font-semibold text-center items-center flex justify-center text-md'>SIGN IN USING DISCORD</div>
                    </div>
                </div>
                <div className='w-[100%] m-auto hover:scale-[1.14] transition-all duration-300 text-slate-800 j text-sm  rounded-md border-slate-700 border bg-white cursor-pointer' onClick={() => signIn("google")} >
                    <div className='flex justify-center '>
                        <div className='border-slate-700 border-r p-5 '><img src='/google.png' width={20} ></img></div>
                        <div className=' w-[100%] py-3  bg-slate-800 text-white font-semibold text-center items-center flex justify-center text-md'>SIGN IN USING GOOGLE</div>
                    </div>
                </div>
        </div> 
  )
}

export default ProvidersComponents