'use client'
import React, { useState } from 'react'
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
import { ArrowUpRight, Delete, Trash, User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { url } from '@/lib/url'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Loading from '../loading'


interface CarData {
  id: string,
  carName: string,
  Img: [],
  brand: string,
  price: Number,
  Fuel: string,
  Seat: string,
  Mileage: Number,
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


const CarDashboard = ({ data }: { data: { carCount: Number, cars: [] } }) => {
  const [loading, setloading] = useState(false)
  const router = useRouter()

  const removeCarHandler = async (id: string) => {
    setloading(true)
    try {
      const { data } = await axios.post(`${url}/api/removeCar`, {
        id: id
      })
      setloading(false)
      data && toast("Car Removed Successfully")
      router.refresh()
    } catch (error) {
      setloading(false)
      toast("Error occured while deleting car")
    }
  }

  return (
    <div>
      {/* table start */}

      {
        loading ?
          <Loading />
          :
          <Table>
            <TableCaption>Total Cars</TableCaption>
            <TableHeader>
              <TableRow>
                <TableCell colSpan={4}>Total Cars</TableCell>
                <TableCell className="text-right"> <div className='flex justify-end items-center'><div> {data.carCount.toString()}</div> <User width={15} /></div> </TableCell>
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
                data && data.cars.map((car: CarData) => (
                  <TableRow key={car.id}>
                    <TableCell className="font-medium w-[200px] text-muted-foreground"> {car.id} </TableCell>
                    <TableCell> {car.carName} </TableCell>
                    <TableCell>{car.price.toLocaleString('en-IN', { style: "currency", currency: "inr" })}</TableCell>
                    <TableCell> {car.Availability} </TableCell>
                    <TableCell className="text-right">
                      <div className='flex justify-end'>
                        <div className='items-end flex justify-end pr-4'><Link href={`/Dashboard/UpdateCarInfo/${car.id}`}> <ArrowUpRight /></Link></div>
                        <div className='items-end flex justify-end pr-4'>
                          <Dialog>
                            <DialogTrigger>
                              <Trash color='red' />
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete this car and remove it from our servers.
                                </DialogDescription>
                              </DialogHeader>
                              <div className='flex justify-evenly'>
                                <DialogClose>
                                  <div className='bg-white px-7 text-slate-700  transition-all duration-300 py-2.5 rounded-md font-semibold text-sm'>Return to Dashboard</div>
                                </DialogClose>
                                <button onClick={() => removeCarHandler(car.id)} className='bg-red-600 px-7 hover:bg-red-800 transition-all duration-300 py-2.5 rounded-md font-semibold text-sm'>Delete</button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }

            </TableBody>
          </Table>
      }
      {/*  */}
    </div>
  )
}

export default CarDashboard