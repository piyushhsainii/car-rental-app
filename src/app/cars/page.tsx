import React from 'react'
import NavMenu from '../components/NavMenu'
import { ScrollArea } from "@/components/ui/scroll-area"
import Filter from '../components/FilterComponent'
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
import MobileFilterComponent from '../components/MobileFilterComponent';
import PaginatedItems from '../components/PaginatedItems';
import { redis } from '@/lib/getRedisUrl'

interface carData {
  id: string,
  carName: string,
  Img: string[],
  brand: String,
  price: Number,
  Fuel: string,
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
  CachedData?:string | null

}
async function getData( Fuel: string, type: string, Gear: string, brand: string, page: string ):Promise<Data | undefined>  {

  const fuel = Fuel
  const fuelSplit = fuel === undefined || fuel === "" ? null : fuel.split(',')
  const typed = type
  const typeSplit = typed === undefined || typed === "" ? null : typed.split(',')
  const gear: string = Gear
  const gearSplit = gear === undefined || gear === "" ? null : gear.split(',')
  const branded = brand
  const brandSplit = branded === undefined || branded === "" ? null : branded.split(',')

  if(Fuel === undefined && type === undefined && gear === undefined && brand === undefined){
      try {
        const CachedCars = await redis.get(`cars?type=${type}&Fuel=${fuel}&Gear=${gear}&brand=${brand}`)
        console.log(" cached")
        if( CachedCars !== null ){
          console.log("Cache hit")
          const Cars = JSON.parse(CachedCars!)
          return {Cars,  error:"Could not fetch data"} 
        }
    
      } catch (error) {
        return  {error:"Could not fetch data"}
    }
  }
  try {
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
            }
          },
        }
      )
      const totalCount = await prisma.cAR.count()
      const totalPages = Math.ceil(totalCount / 6)

      await redis.setex(`cars?type=${type}&Fuel=${fuel}&Gear=${gear}&brand=${brand}`, 3600 , JSON.stringify(Cars) )

      return { Cars, page, totalPages ,  error:"Could not fetch data"  }

  } catch {
    return { error:"Could not fetch data"}
  }
}

const page = async (props: any) => {
  const { Cars, error  } = (await getData(
    props.searchParams.Fuel,
    props.searchParams.type,
    props.searchParams.Gear,
    props.searchParams.brand,
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

               <MobileFilterComponent />

              </div>
            </div>
            {
             error && !Cars ? 
              <div>Could Not Fetch Data </div>
              :
            <div >        
                <PaginatedItems itemsPerPage={6} data={Cars} />
            </div>
                }
          </ScrollArea>
        </div>
      </div>
      <div className='mt-12'>
        <Footer />
      </div>
    </div>
  )
}

export default page