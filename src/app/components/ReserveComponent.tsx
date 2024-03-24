"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

interface carData {
    id: string,
    carName: string,
    Img: string[],
    brand: String,
    price: Number,
    Fuel: string,
    Seat: string,
    Mileage: number,
    Availability: string,
    model: string,
    Plate: string,
    Year: string,
    type: string,
    Transmission: string,
    Color: string,
    ownerShip: string,
    KmsDone: string
  }

const ReserveComponent = ({data}:{data: carData}) => {

    const session = useSession()
    
    const sendToast = ()=>{
        toast("Log In to Reserve your car")
    }
  return (
    <div className=' font-semibold text-lg flex justify-center items-center'>
        <button className=' border border-slate-400   p-4 rounded-md border-opacity-55 duration-300 transition-all hover:border-opacity-100'>
            {
                session && session.status === 'unauthenticated' ? 
                <div onClick={sendToast} >  Reserve this Car  </div>
                 :
                data.Availability === 'Reserved' ? 
                toast("This car is already reserved")
                :
                data.Availability === 'Sold' ? 
                toast("This Car is sold out")
                :
                <Link href={`/Booking/${data.id }`}>  Reserve this Car</Link>
            }
        </button>
    </div>
  )
}

export default ReserveComponent