"use client"
import { url } from '@/lib/url'
import axios from 'axios'
import React from 'react'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Link from 'next/link'
  
interface reservationData {
          id: String,    
          userID: String,
          userName: String,
          userEmail:String,
          carID: string,
          time: Date,
          car: {
            id: String,
            carName: String,
            Img: string[],
            brand: String,
            price: Number,
            Fuel: String,
            Mileage: Number,
            model: String,
            Plate: String,
            type: String,
            Transmission: String,
            Color: String,
            Availability: String,
            Seat: Number,
            KmsDone: Number,
            ownerShip: Number,
            Year: Number
          }
}

const ReservationCard = ({data}:{data:reservationData}) => {

    const cancelReservationHandler = async(carId:string)=> {
        const  { data } = await  axios.post(`${url}/api/cancelReservation`,{
            carId
        })
        data && data.success === true ? 
        toast("Reservation has been cancelled successfully")   
        : null
        data && data.success === true ? 
            window.location.reload()
            :null
    }

  return (
    <div className='max-w-[1200px] flex gap-5 justify-center flex-col lg:flex-row   ' >
                {/* 1 */}
                <div className='w-[300px] flex flex-wrap m-auto '>
                  <div className='text-muted-foreground py-2 px-8 text-sm'>Reservation ID : <span >{data.id}</span> </div>
                    <img src={data.car.Img[0]} className='w-[280px] md:min-w-[350px] border border-slate-300' alt="" />
                </div>
                {/* 2 */}
                <div className='flex flex-col gap-4 w-[300px] my-5  m-auto '>
                    <div className='my-3 w-[200px]  pl-8 font-semibold text-xl'> {data.car.carName} </div>
                    <div className='font-semibold  pl-8 text-lg'> ₹ {data.car.price.toLocaleString()} </div>
                    <div className='font-semibold pl-8 '>Reserved on - <br/> {data.time.toLocaleDateString()} {data.time.toLocaleTimeString()} </div>
                </div>
                    {/* 3 */}
                <div className='flex flex-col gap-4 w-[350px] my-5  m-auto '>
                    <div className='font-semibold text-lg'>
                        AMOUNT RECIEVED - ₹ {(data.car.price as number / 5).toFixed(2)}
                    </div>
                    <div className='font-semibold text-lg'>
                        PAY ₹ {((data.car.price as number / 5)* 4).toFixed() } MORE TO MAKE THIS YOURS
                    </div>
                    <div  className=' border w-[200px] text-center border-slate-400 font-semibold cursor-pointer bg-red-500 hover:bg-red-700 text-white  p-2 rounded-md border-opacity-55  text-sm duration-300 transition-all hover:border-opacity-100'>
                    <Dialog>
                        <DialogTrigger>Cancel Reservation</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently cancel your Reservation
                            </DialogDescription>
                            </DialogHeader>
                            <div onClick={()=>cancelReservationHandler(data.carID)} className=' border w-[200px] text-center border-slate-400 font-semibold cursor-pointer bg-red-500 hover:bg-red-700 text-white  p-2 rounded-md border-opacity-55  text-sm duration-300 transition-all hover:border-opacity-100'
>                               Cancel Reservation
                            </div>
                        </DialogContent>
                    </Dialog>
                    </div>
                    <Link href={`/Purchase/${data.carID}`}>
                    <div className=' border w-[200px] text-center border-slate-400 font-semibold cursor-pointer bg-blue-500 hover:bg-blue-700 text-white  p-2 rounded-md border-opacity-55 text-sm  duration-300 transition-all hover:border-opacity-100'>
                       Purchase this Car
                    </div>
                    </Link>
                </div>

    </div>
  )
}

export default ReservationCard