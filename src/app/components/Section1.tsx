"use client"
import React from 'react'
import { Spotlight } from './SpotLight'
import { useTheme } from 'next-themes'

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
                    Spotlight <br /> is the new trend.
                </h1>
                <p className="mt-4 font-normal text-base text-white max-w-lg text-center mx-auto">
                    Spotlight effect is a great way to draw attention to a specific part
                    of the page. Here, we are drawing the attention towards the text
                    section of the page. I don&apos;t know why but I&apos;m running out of
                    copy.
                </p>
            </div>
        </div>
    )
}

export default Section1