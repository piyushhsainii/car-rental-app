import { Github, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-[35vh] flex justify-between' >
        <div className='p-4'>
            <div className=' text-2xl font-thin  pl-4'>HORSEPOWER CARTEL </div>
            <div className='font-mono p-4 pt-3'>Experience Luxury,Your Way</div>
            <div className='font-mono text-sm pl-4 pt-14' >2024 all Right Reserved Term of use Horsepower Cartel</div>
        </div>
        <div className='flex flex-col gap-6 p-8'>
            <div> <Github /> </div>
            <div> <Twitter /> </div>
            <div> <Linkedin /> </div>
        </div>
    </div>
  )
}

export default Footer