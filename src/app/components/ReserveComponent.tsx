"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
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

const ReserveComponent = ({ data }: { data: carData }) => {

  const session = useSession()

  const sendToast = () => {
    session && session.status === 'unauthenticated' &&
    toast("Log In to Reserve your car")
    data.Availability === 'Reserved' &&
      toast("This car is already reserved")
    data.Availability === 'Sold' &&
      toast("This Car is sold out")
      data.Availability === "Available" && 
      redirect(`/Booking/${data.id}`)
  }
  return (
    <div className=' font-semibold text-lg flex justify-center items-center'>
      {
        session && session.status === 'unauthenticated' ?
        <button onClick={sendToast} className=' border border-slate-400 bg-blue-500 text-white  p-4 rounded-md border-opacity-55 duration-300 transition-all hover:border-opacity-100'>
        Reserve this Car  </button>
              :
              <div onClick={sendToast}>
                  <button className=' border border-slate-400 bg-blue-500 text-white  p-4 rounded-md border-opacity-55 duration-300 transition-all hover:border-opacity-100'>
                    Reserve this Car
                  </button>
              </div> 
        }
     </div>
  )
}

export default ReserveComponent