import React from 'react'
import { unstable_noStore as noStore } from "next/cache";
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
import PaginationComponent from '../components/PaginationComponent'
import Footer from '../components/Footer'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


async function getData(sortBy: string, Fuel: string, type: string, Gear: string, brand: string, seat: string, page: string ) {
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
export const dynamic = 'force-dynamic'

 const page = async (props: any) => {
  noStore();

  const { data } = await getData(
      props.searchParams.sortBy,
      props.searchParams.Fuel,
      props.searchParams.type,
      props.searchParams.Gear,
      props.searchParams.brand,
      props.searchParams.seats,
      props.searchParams.page
    )
    console.log(data,"FRONTEND DATA")
  return (
    <div> 
      <NavMenu />
      <div className='flex  justify-between h-[95vh] ' >
        <Filter />
        <div className='flex flex-col'>
          <ScrollArea className="h-[100%] w-[80vw] m-auto rounded-md border-opacity-45 border-slate-700  border p-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
               <BreadcrumbPage>Cars</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
                  <Link target='_blank' href={`/car/${car.id}`} key={car.id}>
                    <CarCard {...car} />
                  </Link>
                ))
              }
            </div>
          </ScrollArea>
          <PaginationComponent/>
        </div>
      </div> 
          <div className='mt-12'>
             <Footer />
          </div>
    </div>
  )
}

export default page