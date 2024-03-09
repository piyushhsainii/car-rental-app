"use client"
import React, { useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { GithubIcon } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
import { url } from '@/lib/url';

const Auth = () => {
    const session = useSession()
    const navigate = useRouter()
    const [email, setemail] = useState('')
    const [Password, setPassword] = useState('')
    const { setTheme, theme } = useTheme()
    if(session && session.status === 'authenticated'){
        navigate.push('/')
    }
    return (
        <div className='' >
            <div className="flex justify-between  h-[60px] px-4 " >
            <div className="font-thin text-2xl  p-3 " >
             <Link href={'/'}>HORSEPOWER CARTEL </Link>
            </div>
            </div>
            <div className='w-[35vw] py-20 pb-16 rounded-lg  mt-8 m-auto bg-slate-700   p-4 flex flex-col justify-start gap-4'>
                <div className='w-[400px] m-auto    rounded-md border-slate-700 border border-opacity-45 text-sm  bg-slate-900 cursor-pointer' >
                    <hr></hr>
                    <Tabs defaultValue="signup" className="w-[100%] m-auto">
                    <TabsList className='w-[100%] m-auto flex justify-evenly'>
                        <TabsTrigger value="signup"><div className='text-md text-center font-semibold px-5 '> SIGN UP </div></TabsTrigger>
                        <TabsTrigger value="signin"><div className='text-md text-center font-semibold px-5 '> SIGN IN </div></TabsTrigger>
                    </TabsList>
                    <TabsContent value="signup">
                        <div className='p-2 m-4 mt-7 flex justify-between gap-3'>
                            <label className='text-center text-white pt-[6.75px] font-semibold'>Enter Name:</label>
                            <input className='p-2 w-[70%] rounded-md text-black bg-white border border-slate-400'  type="text" placeholder='Enter name' />
                        </div>
                        <div className='p-2 m-4 mt-7 flex justify-between gap-3'>
                            <label className='text-center text-white pt-[6.75px] font-semibold'>Enter Email:</label>
                            <input  className='p-2 w-[70%] bg-white text-black rounded-md  border border-slate-400' type="email" placeholder='Enter Email' /></div>
                        <div className='p-2 m-4 mt-7 flex justify-between gap-3'>
                            <label className='text-center text-white pt-[6.75px] font-semibold'>Enter Password:</label>
                            <input  className='p-2  w-[68%] bg-white text-black rounded-md border border-slate-400' type="password" placeholder='Enter Password' /></div>
                        <div className='p-2 m-4 mt-7 flex justify-between gap-3'>
                                <button onClick={
                                    () => signIn("credentials", {
                                        redirect: false,
                                        callbackUrl: url,
                                        name:"admin",
                                        email: "admin@gmail.com",
                                        password: "adadad"

                                    })
                                } className='p-2  w-[100%] bg-white text-black rounded-md border border-slate-400 hover:bg-gray-200' type="submit" >SIGN UP</button>
                        </div>
                    </TabsContent>
                    <TabsContent value="signin">
                        <div className='p-2 m-4 mt-7 flex justify-between gap-3'>
                            <label className='text-center text-white pt-[6.75px] font-semibold'>Enter Email:</label>
                            <input  className='p-2 w-[70%] bg-white text-black rounded-md  border border-slate-400' type="email" placeholder='Enter Email' /></div>
                        <div className='p-2 m-4 mt-7 flex justify-between gap-3'>
                            <label className='text-center text-white pt-[6.75px] font-semibold'>Enter Password:</label>
                            <input  className='p-2  w-[68%] bg-white text-black rounded-md border border-slate-400' type="password" placeholder='Enter Password' /></div>
                        <div className='p-2 m-4 mt-7 flex justify-between gap-3'>
                            <button  className='p-2  w-[100%] bg-white text-black rounded-md border border-slate-400 hover:bg-gray-200' type="submit" >SIGN IN</button>
                        </div>
                    </TabsContent>
                    </Tabs>

                
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