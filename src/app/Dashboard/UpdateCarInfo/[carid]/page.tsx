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

  const [LOL, setLOL] = useState({
    lmao:"lmao"
  })

  const getData = async()=>{
    const  { data } = await axios.post(`${url}/api/getCarInfo`,{
      id:carid
    })
    setcarData(data.car)
    return data
  }

  useEffect(()=>{
    getData()

  },[])

  return (
    <div> 
         <NavMenu />
         {/* {
          carData === null ?
          <Loading/>
          :
         <div>
              <div> <input type="text" value={} placeholder={carData.carName}  className='bg-transparent border-white border rounded-md m-2 px-2 py-1' /> {} </div>
              <div> <input type="text" value={ carData.price.toLocaleString('en-In',{currency:"INR",style:"currency"}) } className='bg-transparent border-white border rounded-md m-2 px-2 py-1' />  </div>
              <div> <input type="text" className='bg-transparent border-white border rounded-md m-2 px-2 py-1' /> </div>
              <div> <input type="text" className='bg-transparent border-white border rounded-md m-2 px-2 py-1' /> </div>
              <div> <input type="text" className='bg-transparent border-white border rounded-md m-2 px-2 py-1' /> </div>
         </div>
          } */}
    </div>
  )
}

export default UpdateCarInfo