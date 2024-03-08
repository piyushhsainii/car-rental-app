import NavMenu from '@/app/components/NavMenu'
import { Armchair, ArrowLeft, Car, Fuel, Gauge, UserRound } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import axios from 'axios'
import { url } from '@/lib/url'
import Link from 'next/link'
import CarCard from '@/app/components/CarCard'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
  
async function getData(params:string) {
    const {data} = await axios.post(`${url}/api/getCarInfo`,{
        id:params
    })
    const {data:randomCars} = await axios.get(`${url}/api/getRandomCars`
    )

    return {data , randomCars}
  }

const page = async({params}:{params:{id:string}}) => {
    const  {data , randomCars}  = await getData(params.id)
    console.log(randomCars.randomCars , "Data?")
  return (
    <div>
        <NavMenu />
        <div className='flex justify-between m-auto w-[93vw] '>
           <div className='flex flex-col   p-2  ' >
           <Link href={'/cars'}>  <div className='flex items-center border-r pl-3 pr-3 border-slate-300 border-opacity-60'><ArrowLeft width={15} /> <div>Back</div> </div></Link>
            <div className='flex flex-col '>
                <div className='pl-5 mt-5'>
                <Breadcrumb>
                 <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/cars">Cars</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Car Info</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                </div>
                <div className='text-2xl p-3 font-semibold'> {data.car.carName} </div>
                <div className='text-xl p-3 pt-0 font-semibold' >{data.car && data.car.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
            </div>
             </div>
            <div className=' font-semibold text-lg flex justify-center items-center'>
                <button className=' border border-slate-400   p-4 rounded-md border-opacity-55 duration-300 transition-all hover:border-opacity-100'>
                  <Link href={`/Booking/${data.car.id}`}>  Reserve this Car</Link>
                </button> </div>
            </div>
        <div className='w-full h-[300px]'>
            <Carousel className='w-[90vw] m-auto h-[300px] '>
                <CarouselContent>
                    {
                    data && data.car.Img &&  data.car.Img.map((car:string)=>(
                            <CarouselItem className='basis-1/3 pl-4 pt-4 m-auto'>
                                <img src={car} alt="Car Image" />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
        {/* SPECIFICATION DIV */}
        <div className='p-4 ml-14 text-xl font-semibold' >
            CAR SPECIFICATIONS 
        </div>
        <div className='w-[75vw]  ml-16 m-4 flex flex-wrap justify-start gap-6' >
            <div className='w-[200px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
              <div> <Car strokeWidth={1} /> </div>  <div className='text-muted-foreground'>Model </div> <div>{data.car.model}</div>
            </div>
            <div className='w-[200px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
              <div><UserRound strokeWidth={0.75} /></div> <div className='text-muted-foreground' > Ownership</div>  <div>{data.car.ownerShip}</div>
            </div>
            <div className='w-[200px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
            <div><Gauge strokeWidth={1} /></div> <div className='text-muted-foreground' >Kms Done</div>  <div> {data.car.KmsDone}</div>              
            </div>
            <div className='w-[200px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
            <div><Armchair strokeWidth={1} /></div> <div className='text-muted-foreground' >Seat Capacity</div>  <div> {data.car.Seat}</div>   
            </div>
            <div className='w-[200px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
             <div className='bg-white'><img width={28} src="/gear-shift.png" alt="" />  </div><div className='font-normal text-muted-foreground'>Transmission</div>  <div> {data.car.Transmission}</div> 
            </div>
            <div className='w-[200px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
             <div><Fuel strokeWidth={1} /></div>   <div className='text-muted-foreground' >Fuel Type</div>  <div> {data.car.Fuel} </div> 
            </div>
        </div>

        {/* Explore more */}
        <div className='' >
            <div className='p-4 ml-14 text-xl font-semibold' >
                Explore More
            </div>
            <div className='w-full h-[300px]'>
            <Carousel className='w-[90vw] m-auto h-[300px] '>
                <CarouselContent>
                {
                    randomCars && randomCars.randomCars.map((car:any) => (
                        <CarouselItem className='basis-1/3 pl-4 pt-4 m-auto' key={car.id}>
                        <Link href={`/car/${car.id}`}>
                            <CarCard {...car} />
                        </Link>
                        </CarouselItem>
                    ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
        </div>
    </div>
  )
}

export default page