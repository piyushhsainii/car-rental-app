import React from 'react'
import { DirectionAwareHover } from './DirectionAware'

const CarCard = () => {
  return (
    <div className='bg-slate-500 min-h-[350px] w-[320px] overflow-hidden rounded-md ' >
    <div>
        <DirectionAwareHover className='h-[300px] w-[340px]  m-auto c ' imageUrl={'/Logo.png'}>
        <div className='flex justify-evenly gap-1 '>
                <div className='flex flex-col items-center justify-center'>
                    <div>Fuel Type</div>
                    <div>Petrol</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div>Fuel Type</div>
                    <div>Petrol</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div>Fuel Type</div>
                    <div>Petrol</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div>Fuel Type</div>
                    <div>Petrol</div>
                </div>            
            </div>
        </DirectionAwareHover>
    </div>
        <div className='flex flex-col justify-evenly gap-2 p-2'>
            <div className='text-md font-semibold pl-3 '>25,000</div>
            <div className='pl-3 text-xl font-semibold'>JEEP</div>
            <div className='flex justify-evenly gap-1 '>
                <div className='flex flex-col items-center justify-center'>
                    <div>Fuel Type</div>
                    <div>Petrol</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div>Fuel Type</div>
                    <div>Petrol</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div>Fuel Type</div>
                    <div>Petrol</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div>Fuel Type</div>
                    <div>Petrol</div>
                </div>            
            </div>
        </div>
    </div>
  )
}

export default CarCard