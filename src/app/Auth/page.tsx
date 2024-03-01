"use client"
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { GithubIcon } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation';

const Auth = () => {
    const session = useSession()
    const navigate = useRouter()
    const { setTheme, theme } = useTheme()
    if(session && session.status === 'authenticated'){
        navigate.push('/')
    }
    return (
        <div className='' >
            <div className="flex justify-between  h-[60px] px-4 " >
                <div className="" >
                    {
                        theme && theme === 'dark' ?
                            <Image src={'/Logo3.png'} className="" width={180} height={60} alt="logo"></Image> :
                            <Image src={'/Logo.png'} className="" width={180} height={60} alt="logo"></Image>
                    }
                </div>
            </div>
            <div className='w-[35vw] py-20 pb-16 rounded-lg  mt-8 m-auto bg-slate-700   p-4 flex flex-col justify-start gap-4'>
                <div className='w-[400px] m-auto  text-slate-800  rounded-md border-slate-700 border border-opacity-45 text-sm  bg-white cursor-pointer' >
                    <div className='text-2xl text-center font-semibold p-4'> SIGN UP </div>
                    <hr></hr>
                    <div className='p-2 m-2 flex gap-3'>
                        <label className='text-center pt-[6.75px] font-semibold'>Enter Name:</label>
                        <input className='p-2 w-[70%] bg-white border border-slate-400'  type="text" placeholder='Enter name' />
                    </div>
                    <div className='p-2 m-2 flex gap-3'>
                        <label className='text-center pt-[6.75px] font-semibold'>Enter Email:</label>
                        <input  className='p-2 w-[70%] bg-white  border border-slate-400' type="email" placeholder='Enter Email' /></div>
                    <div className='p-2 m-2 flex gap-3'>
                        <label className='text-center pt-[6.75px] font-semibold'>Enter Password:</label>
                        <input  className='p-2  w-[68%] bg-white border border-slate-400' type="password" placeholder='Enter Password' /></div>
                </div>
                <div className='w-[400px] m-auto  text-slate-800  rounded-md border-slate-700 border text-sm  bg-white cursor-pointer' onClick={() => signIn("github")} >
                    <div className='flex justify-center'>
                        <div className='border-slate-700 border-r p-2 '><GithubIcon /></div>
                        <div className=' w-[100%]  bg-slate-800 text-white text-center items-center flex justify-center text-md'>SIGN IN USING GITHUB</div> </div>
                </div>
                <div className='w-[400px] m-auto text-slate-800 j text-sm  rounded-md border-slate-700 border bg-white cursor-pointer' onClick={() => signIn("discord")} >
                    <div className='flex ustify-center '>
                        <div className='border-slate-700 border-r p-2 py-3 '><img src='/discord.png' width={20} ></img></div>
                        <div className=' w-[100%] py-3  bg-slate-800 text-white text-center items-center flex justify-center text-md'>SIGN IN USING DISCORD</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth