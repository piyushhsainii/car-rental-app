import React from 'react'
import { unstable_noStore as noStore } from "next/cache";
import NavMenu from '../components/NavMenu'
import { ScrollArea } from "@/components/ui/scroll-area"
import CarCard from '../components/CarCard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import { url } from '@/lib/url'
import Filter from '../components/FilterComponent'
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
import prisma from '@/lib/prismaClient';
import { Badge } from '@/components/ui/badge'
import MobileFilterComponent from '../components/MobileFilterComponent';
import ReactPaginate from 'react-paginate';
import PaginatedItems from '../components/PaginatedItems';



enum SortOrder {
  asc = "asc",
  desc = "desc"
}

interface carData {
  id: string,
  carName: string,
  Img: string[],
  brand: String,
  price: Number,
  Fuel: string,
  Seat: number,
  Mileage: number,
  Availability: string,
  model: string,
  Plate: string,
  Year: number,
  type: string,
  Transmission: string,
  Color: string,
  ownerShip: number,
  KmsDone: number
}
interface Data {
  Cars?: carData[];
  page?: string;
  totalPages?: number;
  error?:string
}
async function getData(sortBy: SortOrder, Fuel: string, type: string, Gear: string, brand: string, seat: number[], page: string):Promise<Data | undefined> {

  const params: SortOrder = sortBy
  const fuel = Fuel
  const fuelSplit = fuel === undefined || fuel === "" ? null : fuel.split(',')
  const typed = type
  const typeSplit = typed === undefined || typed === "" ? null : typed.split(',')
  const gear: string = Gear
  const gearSplit = gear === undefined || gear === "" ? null : gear.split(',')
  const branded = brand
  const brandSplit = branded === undefined || branded === "" ? null : branded.split(',')
  const seated = seat
  const paged:number = parseFloat(page)

  let skip
  if(paged){ 
    skip = ((paged - 1)* 3 )
  }
  try {
    if (!params) {
      const Cars = await prisma.cAR.findMany(
        {
          where: {
            Fuel: {
              in: fuelSplit || ["Petrol", "Diesel"]
            },
            type: {
              in: typeSplit || ["Sedan", "SUV", "Hatchback"]
            }
            ,
            Transmission: {
              in: gearSplit || ["Automatic", "Manual"]
            },
            brand: {
              in: brandSplit || ["Mercedes", "Audi", "BMW", "Bentley", "Skoda", "Porsche"]
            },
            Seat: {
              in:seat || [1, 2, 3, 4, 5, 6]
            }
          },
          // take:6,
          // skip: skip
        }
      )
      const totalCount = await prisma.cAR.count()
      const totalPages = Math.ceil(totalCount / 6)
      return { Cars, page, totalPages,  error:"Could not fetch data" }

    }

    if (params) {
      const Cars = await prisma.cAR.findMany(
        {
          orderBy: {
            price: params
          },
          where: {
            Fuel: {
              in: fuelSplit || ["Petrol", "Diesel"]
            },
            type: {
              in: typeSplit || ["Sedan", "SUV", "Hatchback"]
            }
            ,
            Transmission: {
              in: gearSplit || ["Automatic", "Manual"]
            },
            brand: {
              in: brandSplit || ["Mercedes", "Audi", "BMW", "Bentley", "Skoda", "Porsche"]
            },
            Seat: {
              in: seat || [1, 2, 3, 4, 5, 6]
            }
          },
          // take:6,
          // skip: skip
        }
      )
      const totalCount = await prisma.cAR.count()
      const totalPages = Math.ceil(totalCount / 6)

      return { Cars, page, totalPages , error:"Could not fetch data" }
    }

  } catch {
    return { error:"Could not fetch data"}
  }

}


export const dynamic = 'force-dynamic'

const page = async (props: any) => {
  noStore();
  const { Cars, page, totalPages , error } = (await getData(
    props.searchParams.sortBy,
    props.searchParams.Fuel,
    props.searchParams.type,
    props.searchParams.Gear,
    props.searchParams.brand,
    props.searchParams.seats,
    props.searchParams.page
  ))!
  return (
    <div>
      <NavMenu />
      <div className='flex  justify-between  max-h-[1400px] ' >
        <Filter />
        <div className='flex flex-col'>
          <ScrollArea className="h-[100%] w-[100vw] lg:w-[80vw] m-auto rounded-md border-opacity-45 border-slate-700 border-l  border-t lg:p-4">
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
              <div className='font-semibold'> Total {Cars?.length} results found </div>
              <div className='flex items-center'>

               {/*  */}
               <MobileFilterComponent />

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
            {
             error && !Cars ? 
              <div>Could Not Fetch Data</div>
              :
            <div className='flex  gap-3 flex-wrap justify-evenly'>
             <PaginatedItems itemsPerPage={6} data={Cars} />
              {/* {
                Cars && Cars.map((car: carData) => (
                  <Link target='_blank' href={`/car/${car.id}`} key={car.id}>
                    <CarCard {...car} />
                  </Link>
                ))
              } */}
            </div>
                }
          </ScrollArea>

          <div className='flex justify-center p-4'>
            {/* <Link href={`/cars?page=${1}`}>
              <div className='p-2 mx-3 cursor-pointer px-2 py-1 border border-slate-300 font-semibold'>
                &#x276E; 
              </div>
            </Link>
            <Badge className='text-md' variant="outline">
              <span className='px-4'>{page ?? "1"} </span>  / <span className='px-4'> {totalPages} </span>
            </Badge>
            <Link href={`/cars?page=${2}`} >
              <div className='p-2 mx-3 cursor-pointer px-2 py-1 border border-slate-300 font-semibold'>
                  &#x276F; 
              </div>
            </Link> */}
          </div>

        </div>
      </div>
      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  )
}

export default page