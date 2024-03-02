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

async function getData(params:string) {
  const {data} = await axios.get(`${url}/api/getCars`)
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

const page = async(props:any) => {
  const {data} = await getData(props.searchParams)
  console.log(props.searchParams, "prop check")
  return (
    <div>
        <NavMenu/>
        <div className='flex justify-between h-[100vh] ' >
        <ScrollArea className="h-[100%] w-[250px] rounded-md border-slate-700 border-opacity-35 border-r p-4">
            <div className='flex gap-3 justify-center'>
                 <FilterIcon width={18} />
                 <div className='font-semibold'>Filter</div>
                 <div className='ml-16 pt-[0.7px] text-sm items-center text-primary underline '>clear all </div>
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40'>
                <div className='font-semibold  mb-4'>Type</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>Hatchback</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Sedan</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> SUV</div>
                {/* <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Compact SUV</div> */}
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40' >
                <div className='font-semibold  mb-4'>Fuel</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>Petrol</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Diesel</div>
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40'>
                <div className='font-semibold  mb-4'>Transmission</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>Automatic</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Manual</div>
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40'>
                <div className='font-semibold  mb-4'>Brand</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>AUDI</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> BMW</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Mercedes </div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Porsche </div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Bentley </div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Skoda</div>
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40'>
                <div className='font-semibold  mb-4'>Seating Capacity</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>4</div> 
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> 5</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> 6+</div>
             </div>
        </ScrollArea>
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
            <div className='flex gap-6 flex-wrap justify-center'>
              {
                data && data.map((car:carData)=>(
                  <Link href={`/car/${car.id}`} key={car.id}>
                    <CarCard {...car}  />
                  </Link>
                ))
              }
            </div>
        </ScrollArea>
        </div>

    </div>
  )
}

export default page