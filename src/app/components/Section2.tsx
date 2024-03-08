import { BookCheck, Handshake, Search } from 'lucide-react'
import React from 'react'

const Section2 = () => {
  return (
    <div className='flex flex-col start w-[100%] min-h-[50vh] gap-10 ' >
        <div className='text-center'>
            <div className='p-3 font-sans text-3xl font-semibold'>How Horsepower Cartel Works </div>
            <div  className='p-1 font-thin text-lg' > Experience Luxury, Your Way</div>
        </div>
        <div className='flex justify-evenly my-5  text-center items-center  '>
            <div className='flex flex-col gap-2 justify-center p-8 border border-slate-300 border-opacity-30 rounded-md' >
                <div className='m-auto'><Search /></div>
                <div className='text-lg font-semibold max-w-[200px]  '>Explore & Choose</div>
                <div className='max-w-[200px] text-sm'>Browse our extensive inventory of luxury vehicles to find the perfect match for your lifestyle and preferences.</div>
            </div>
            <div className='flex flex-col gap-2 border border-slate-300 border-opacity-30 rounded-md p-8 ' >
                <div className='m-auto'><BookCheck /></div>
                <div className='text-lg font-semibold max-w-[200px] '>Reserve & Book</div>
                <div className='max-w-[200px] text-sm'>Secure your chosen vehicle quickly and easily by reserving it so that it is available exclusively for you</div>
            </div>
            <div className='flex flex-col gap-2 p-8 border border-slate-300 border-opacity-30 rounded-md' >
                <div className='m-auto'><Handshake /></div>
                <div className='text-lg font-semibold max-w-[200px] '>Hit the Road  </div>
                <div className='max-w-[200px] text-sm'>Once you're satisfied with your choice, our seamless purchasing process allows you to drive away in your new luxury car with confidence and satisfaction</div>
            </div>

        </div>
    </div>
  )
}

export default Section2