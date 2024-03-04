import React from 'react'
import NavMenu from '../components/NavMenu'
import { ScrollArea } from "@/components/ui/scroll-area"
import { FilterIcon } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import CarCard from '../components/CarCard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import { url } from '@/lib/url'
import Filter from '../components/FilterComponent'
import { Badge } from "@/components/ui/badge"

async function getData(
  sortBy: string,
  Fuel: string,
  type: string,
  Gear: string,
  brand: string,
  seat: string,
  page: string
  ) {
  const { data } = await axios.post(`${url}/api/getCars`, {
    sortBy, Fuel, type, Gear, brand , seat,page
  })
  return data
}

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

const page = async (props: any) => {
  const { data } = await getData(
    props.searchParams.sortBy,
    props.searchParams.Fuel,
    props.searchParams.type,
    props.searchParams.Gear,
    props.searchParams.brand,
    props.searchParams.seat,
    props.searchParams.page
    )

  return (
    <div>
      <NavMenu />
      <div className='flex  justify-between h-[88vh] ' >
        <Filter props={props.searchParams} />
        <div className='flex flex-col'>
          <ScrollArea className="h-[100%] w-[80vw] m-auto rounded-md border-opacity-45 border-slate-700  border p-4">
            <div className='flex justify-between p-3 px-7' >
              <div className='font-semibold'> Total {data.length} results found </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Sort By -</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className='cursor-pointer'> <Link href={'/cars?sortBy=asc'}>Price- Low to High</Link> </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className='cursor-pointer '><Link href={'/cars?sortBy=desc'}> Price- High to Low</Link></DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className='flex gap-3 flex-wrap justify-evenly'>
              {
                data && data.map((car: carData) => (
                  <Link href={`/car/${car.id}`} key={car.id}>
                    <CarCard {...car} />
                  </Link>
                ))
              }
            </div>
          </ScrollArea>
            <div className='flex justify-center'>
            <div className='p-2 cursor-pointer'>&#x276E; </div> 
            <Badge className='text-md' variant="outline"> <Link href={'/'}>1</Link> / <Link href={''}>2</Link> </Badge>
            <div className='p-2 cursor-pointer'>&#x276F;</div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default page