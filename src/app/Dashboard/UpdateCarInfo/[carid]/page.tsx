import NavMenu from '@/app/components/NavMenu'
import { prisma } from '@/lib/prismaClient'
import axios from 'axios'
import React from 'react'


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

export async function getData(params:string){
  
    const cars = await prisma.cAR.findFirst({
        where:{
            id:params
        }
    })
    return cars
}

const UpdateCarInfo = async(params:any) => {
  const  data = await getData(params.params.carid)
  console.log(data)

  return (
    <div> 
         <NavMenu />
         <div>
                UpdateCarInfo
         </div>
    </div>
  )
}

export default UpdateCarInfo