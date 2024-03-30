"use client"
import { url } from '@/lib/url'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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

const PurchaseComponent = ({ data }: { data: carData }) => {

  const session = useSession()

  const sendToast = () => {
    session && session.status === 'unauthenticated' &&
      toast("Log In to Reserve your car")
      // @ts-ignore
    data.Availability === 'Reserved' && Data?.userID !== session?.data?.user?.id && session && session.status === 'authenticated' &&
      toast("This car is already reserved")
    data.Availability === 'Sold'  && session && session.status === 'authenticated' &&
      toast("This Car is sold out")

  }
  const [Data, setData] = useState(null)


    useEffect(()=>{
      fetch(`${url}/api/getReservedCars`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({carID:data.id})
      }).then((res)=>res.json())
      .then((data)=>setData(data.reserved))
    },[])

  return (
    <div className=' font-semibold text-lg flex justify-center items-center'>
      {
        session && session.status === 'unauthenticated' ?
          <button onClick={sendToast} className=' border border-slate-400 bg-blue-500 text-white  p-4 px-8 rounded-md border-opacity-55 duration-300 transition-all hover:border-opacity-100'>
            Purchase  </button>
          :
            data.Availability === "Available" ?
              <Link href={`/Purchase/${data.id}`}>
                <div onClick={sendToast}>
                  <button className=' border border-slate-400 bg-blue-500 text-white  p-4 px-8 rounded-md border-opacity-55 duration-300 transition-all hover:border-opacity-100'>
                    Purchase 
                  </button>
                </div>
              </Link>
              :
              // @ts-ignore
              Data?.userID === session?.data?.user?.id ?
              <Link href={`/Purchase/${data.id}`}>
              <div onClick={sendToast}>
                <button className=' border border-slate-400 bg-blue-500 text-white  p-4 px-8 rounded-md border-opacity-55 duration-300 transition-all hover:border-opacity-100'>
                  Purchase 
                </button>
              </div>
             </Link>
              :
              <div onClick={sendToast} className=''>
                <button className='cursor-not-allowed border border-slate-400 bg-blue-500 text-white  p-4 px-8 rounded-md border-opacity-55 duration-300 transition-all hover:border-opacity-100'>
                  Purchase 
                </button>
              </div>
          
      }
    </div>
  )
}

export default PurchaseComponent