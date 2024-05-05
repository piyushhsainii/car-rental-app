import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-[35vh] flex justify-between mt-12 bg-gray-950 text-white' >
        <div className='p-4'>
            <div className='text-xl  sm:text-2xl font-thin  pl-4'>HORSEPOWER CARTEL </div>
            <div className=' p-4 pt-3 text-sm sm:text-md'>Experience Luxury, Your Way</div>
            <div className='font-mono text-sm text-muted-foreground pl-4 pt-14 max-w-[450px]' >Copyright © 2024 Horsepower Cartel All rights reserved. </div>
        </div>
        <div className='flex flex-col gap-6 p-8'>
            <div> <Link href={'https://github.com/piyushhsainii'} > <Github /></Link>  </div>
            <div> <Link href={'https://twitter.com/piyushsainii'} > <Twitter  /></Link> </div>
            <div> <Link href={'https://www.linkedin.com/in/piyush-saini-b860ab1bb/'}><Linkedin /> </Link></div>
        </div>
    </div>
  )
}

export default Footer