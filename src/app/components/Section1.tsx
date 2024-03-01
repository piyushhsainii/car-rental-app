"use client"
import React from 'react'
import { Spotlight } from './SpotLight'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const Section1 = () => {
    const {theme} = useTheme()
    return (
        <div className='h-[40rem] w-full rounded-md flex md:items-center md:justify-center  antialiased bg-grid-primary/[0.02] relative overflow-hidden' >
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill={`${theme==='dark' ? 'white' : 'blue'}`}
            />
            <div className=" text-primary p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-blue-800 to-blue-300 dark:bg-gradient-to-b dark:from-white dark:to-slate-600 bg-opacity-50">
                   Experience Luxury, <br></br> Your Way
                </h1>
                 <div className='m-auto border hover:border-slate-300 transition-all duration-400 border-opacity-45 w-[200px] text-center p-2 px-4 rounded-md my-5'>
                     <Link href={'/cars'}> <button>Browse Collections</button> </Link>
                 </div>
            </div>
        </div>
    )
}

export default Section1