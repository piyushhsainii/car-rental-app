import React from 'react'
import { DirectionAwareHover } from './DirectionAware'


interface carData {
    id: String,
    carName: String,
    Img: String[],
    brand: String,
    price: Number, 
    Fuel: String,
    Seat: Number,
    Mileage: Number,
    Availability: String,
    model: String,
    Plate: String,
    Year: Number,
    type: String,
    Transmission: String,
    Color: String,
    ownerShip: Number,
    KmsDone: Number
  }


const CarCard = (props:carData) => {
    const Image = props.Img[0]
  return ( 
      <div className='min-h-[360px] h-[434px] w-[340px] overflow-hidden rounded-md border border-slate-700 border-opacity-50 ' >
        {
            Image &&  
            <div>
              <DirectionAwareHover className='h-[270px]  max-w-[400px] m-auto ' imageUrl={Image as string}>
                  <div className='flex justify-evenly gap-1 text-md '>
                      Click to View Details        
                  </div>
              </DirectionAwareHover>
          </div>
        }
        <div className='flex flex-col justify-evenly gap-2 p-2'>
           <div className='flex justify-between'>
            <div className='text-lg font-semibold pl-3 '>{props.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div> 
            {
                props.Availability === 'Reserved' ?
                <div className='text-sm px-3 py-1 rounded-md font-semibold text-center bg-red-600 '>Reserved</div> : null
            }
           </div>
            <div className='pl-3 text-xl font-semibold'> {props.carName} </div>
            <div className='flex justify-around gap-1 '>
                <div className='flex flex-col items-center justify-center text-[12px]'>
                    <div> Fuel Type </div>
                    <div>{props.Fuel}</div>
                </div>
                <div className='flex flex-col items-center justify-center text-[12px]'>
                    <div>Kms</div>
                    <div> {props.KmsDone.toString()} </div>
                </div>
                <div className='flex flex-col items-center justify-center text-[12px]'>
                    <div>Reg.Year</div>
                    <div> {props.Year.toString()} </div>
                </div>
                <div className='flex flex-col items-center justify-center text-[12px]'>
                    <div>Fuel Type</div>
                    <div> {props.Plate} </div>
                </div>            
            </div>
        </div>
    </div>
  )
}

export default CarCard