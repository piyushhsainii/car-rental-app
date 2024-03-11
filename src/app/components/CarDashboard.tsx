'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ArrowUpRight, User } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'

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


const CarDashboard = ({data}:{data:{ carCount:Number , cars:[] }}) => {
  return (
    <div>
{/* table start */}
<Table>
  <TableCaption>Total Cars</TableCaption>
  <TableHeader>
  <TableRow>
      <TableCell colSpan={4}>Total Cars</TableCell>
      <TableCell className="text-right"> <div className='flex justify-end items-center'><div> { data.carCount.toString() }</div> <User width={15}/></div> </TableCell>
    </TableRow>
    <TableRow>
      <TableHead className="w-[100px]">Car ID</TableHead>
      <TableHead>Car Name</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Reserved</TableHead>
      <TableHead className="text-right">Update Car Info</TableHead>
    </TableRow>
  </TableHeader>
  
  <TableBody>
    {
      data && data.cars.map((car:CarData)=>(
        <TableRow key={car.id}>
        <TableCell className="font-medium w-[200px] text-muted-foreground"> {car.id } </TableCell>
        <TableCell> { car.carName } </TableCell>
        <TableCell>{car.price.toLocaleString('en-IN',{style:"currency",currency:"inr"})}</TableCell>
        <TableCell> {car.Availability} </TableCell>
        <TableCell className="text-right"> 
            <div className='items-end flex justify-end pr-4'><Link href={`/Dashboard/UpdateCarInfo/${car.id}`}> <ArrowUpRight /></Link></div>
         </TableCell>
      </TableRow>
      ))
    }
   
  </TableBody>
</Table>
{/*  */}
</div>
  )
}

export default CarDashboard