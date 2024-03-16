'use client'
import NavMenu from '@/app/components/NavMenu'
import Loading from '@/app/loading'
import { prisma } from '@/lib/prismaClient'
import { url } from '@/lib/url'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


interface CarData {
  id: string,
  carName: string,
  Img: [],
  brand: string,
  price: Number,
  Fuel: string,
  Seat: string,
  Mileage:Number,
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



const UpdateCarInfo = async(params:any) => {
  const carid = params.params.carid
  const [carData, setcarData] = useState<CarData | null>(null)
  const [formData, setFormData] =   useState<CarData | null>(null)
  const [carName, setCarName] = useState("")

  const getData = async()=>{
    const  { data } = await axios.post(`${url}/api/getCarInfo`,{
      id:carid
    })
    setcarData(data.car)
    setFormData(data.car)
    setCarName(data.car.carName)
  }

  useEffect(()=>{
    getData()

  },[])

  return (
    <div> 
         <NavMenu />
       
         {/* {
          carData === null || formData === null ?
          <Loading/>
          : */}
         <div>
          <form action="">
             {/* <div> <input type="text" value={formData?.carName} onChange={(e) => setFormData((prevData: CarData | null) => ({ ...prevData!, carName: e.target.value }))}  className='bg-transparent border-white border rounded-md m-2 px-2 py-1' /> {} </div>  */}
              <div> <input type="text" value={carName} placeholder='Enter Car Name' onChange={(e)=>setCarName(e.target.value)}  className='bg-transparent border-white border rounded-md m-2 px-2 py-1' /> {} </div>
              {/* <div> <input type="text" value={ formData.price.toLocaleString('en-In',{currency:"INR",style:"currency"}) } className='bg-transparent border-white border rounded-md m-2 px-2 py-1' />  </div> */}
              {/* <div> <input type="text" className='bg-transparent border-white border rounded-md m-2 px-2 py-1' /> </div> */}
              {/* <div> <input type="text" className='bg-transparent border-white border rounded-md m-2 px-2 py-1' /> </div> */}
              {/* <div> <input type="text" className='bg-transparent border-white border rounded-md m-2 px-2 py-1' /> </div> */}
          </form>
         </div>
          {/*  } */}
    </div>
  )
}

export default UpdateCarInfo