"use client"
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    const {theme} = useTheme()
  return (
    <div className="flex items-center justify-center gap-10" >
            { 
             theme && theme ==='dark' ?
                <Link href={'/'}><Image src={'/Logo3.png'} className="" width={180} height={60} alt="logo"></Image></Link>
                 : 
                <Link href={'/'}><Image src={'/Logo.png'} className="" width={180} height={60} alt="logo"></Image></Link>
        }
        <div className="text-md font-semibold px-4"> <Link href={'/cars'}>Cars</Link> </div>
        </div>
  )
}

export default Logo