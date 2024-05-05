import { BookCheck, Handshake, Search } from 'lucide-react'
import React from 'react'

const Section2 = () => {
  return (
    <div className='flex flex-col start w-[100%] min-h-[50vh] gap-10 ' >
        <div className='text-center'>
            <div className='p-3 font-sans text-3xl font-bold'>How Horsepower Cartel Works </div>
            <div  className='p-1 font-semibold text-2xl' > Experience Luxury, Your Way</div>
        </div>
        <div className='flex flex-col sm:flex-row justify-evenly flex-wrap gap-5  text-center items-center  '>
            <div className='flex flex-col w-[300px] items-center gap-2 h-[350px] justify-center p-8 border border-slate-400 hover:border-opacity-80 transition-all duration-300 border-opacity-30 rounded-md' >
                <div className='mx-auto h-[50px] my-2 p-0'><Search /></div>
                <div className='text-xl font-semibold max-w-[200px]  '>Explore & Choose</div>
                <div className='max-w-[200px] text-base text-center'>Browse our extensive inventory of luxury vehicles to find the perfect match for your lifestyle and preferences.</div>
            </div>
            <div className='flex flex-col w-[300px] items-center gap-2 border justify-center h-[350px] border-slate-400 border-opacity-30 hover:border-opacity-80 transition-all duration-300 rounded-md p-8 ' >
                <div className='mx-auto h-[50px]  p-0'><BookCheck /></div>
                <div className='text-xl font-semibold max-w-[200px]  '>Reserve & Book</div>
                <div className='max-w-[200px] text-base text-center'>Secure your chosen vehicle quickly and easily by reserving it so that it is available exclusively for you</div>
            </div>
            <div className='flex flex-col w-[300px] items-center gap-2 p-8 justify-center border h-[350px] border-slate-400 border-opacity-30 hover:border-opacity-80 transition-all duration-300 rounded-md' >
                <div className='mx-auto h-[50px] mt-6 p-0'><Handshake /></div>
                <div className='text-xl font-semibold max-w-[200px] '>Hit the Road  </div>
                <div className='max-w-[200px] text-base text-center'>Once you're satisfied with your choice, our seamless purchasing process allows you to drive away in your new luxury car with confidence and satisfaction</div>
            </div>

        </div>
    </div>
  )
}

export default Section2