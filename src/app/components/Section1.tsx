"use client"
import React from 'react'
import { Spotlight } from './SpotLight'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { ButtonsCard } from '../../../tailwindcss-buttons'

const Section1 = () => {
    const {theme  } = useTheme()
    console.log(theme)
    return (
        <div className='h-[70vh] md:min-h-[100vh] w-full rounded-md flex md:items-center md:justify-center  antialiased bg-grid-primary/[0.02] relative overflow-hidden' >
                <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill={`darkblue`}
                />
            <div className=" text-primary p-4 m-3 py-5 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className=" select-none text-4xl md:text-7xl p-3 font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-300 dark:bg-gradient-to-b dark:from-white dark:to-slate-600 bg-opacity-50">
                   Experience Luxury, <br></br> Your Way
                </h1>
                 <div className='m-auto  w-[200px] text-center  rounded-md my-5'>
                     <Link href={'/cars'}> 
                        <ButtonsCard>
                        <button className="inline-flex h-12 p-2  animate-shimmer items-center justify-center rounded-md hover:border-slate-300  duration-400 border-opacity-45  bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]  bg-[length:200%_100%] px-6 font-medium  text-slate-300 transition-colors  ">
                            Browse Collections
                        </button>
                        </ButtonsCard>
                  </Link>
                 </div>
            </div>
        </div>
    )
}

export default Section1