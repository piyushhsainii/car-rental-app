"use client"
import NavMenu from '../../components/NavMenu'
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'
import Loading from '@/app/loading';
import { Armchair, Car, Fuel, Gauge, UserRound } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { url } from '@/lib/url';
import CheckoutForm2 from '@/app/components/CheckoutForm2';
import CheckoutForm from '@/app/components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

interface carData {
  id: string,
  carName: string,
  Img: string[],
  brand: string,
  price: number,
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


const page = ({params}:any) => {

  const [clientSecret, setClientSecret] = useState(""); 
  const [Data, setData] = useState<carData | null>(null);
  const [Data2, setData2] = useState(null);
  // const [ price , setPrice ] = useState(Data?.price)
  const  { data } = useSession()

  useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch('/api/getCarInfo',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({id:params.id})
      }).then((res)=>res.json())
      .then((data)=>setData(data.car))

      fetch(`${url}/api/getReservedCars`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({carID:params.id})
      }).then((res)=>res.json())
      .then((data)=>setData2(data.reserved))
        
    }, []);



    useEffect(()=>{
      // Data?.Availability === "Reserved" ?
      // setPrice(((Data.price/5)*4)) :
      // setPrice(Data?.price)

      fetch(`/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // @ts-ignore
        body: JSON.stringify({ items: [{ id: params.id }] ,amount:!Data2 ? parseInt(Data?.price.toString().slice(0,4)) : parseInt(((Data?.price as number /5)*4).toString().slice(0,4)) , carid:params.id } ),
      }).then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

    },[Data])

    interface appearance {
      theme:'stripe' | "night" | "flat"
    }
    const appearance:appearance = {
      theme: 'night',
    };
    const options:StripeElementsOptions = {
      clientSecret,
      appearance,
    };
  if(Data?.Availability === "Sold"){
    redirect('/cars')
  }
  // @ts-ignore
  if(Data?.Availability==='Reserved' && Data2?.userID !== data?.user?.id ){
    redirect('/cars')
  }

  return (
      Data === null ?
        <Loading/>
        : 
    <div>
        <NavMenu />
        <div className='max-w-[1200px] m-auto   ' >
        <div className='flex justify-evenly flex-col lg:flex-row p-4 gap-2 '>
          <div className=' w-[50%] m-auto pb-2 '>
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
                    <BreadcrumbLink href={`/car/${params.id}`}>Car Info</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Reservation</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
            <div className='text-3xl font-semibold text-center my-3' >{Data?.carName}</div>
            <div className='text-xl font-semibold py-2 text-center'> { Data.price.toLocaleString('en-In', { style: 'currency', currency: 'INR' }) }  </div>
            <div className='max-w-[400px] m-auto'>
                <img src= { Data?.Img[0] as string }  className='w-[400px] h-[auto] max-h-[300px] rounded-md ' alt="" />
            </div>
          </div>

          <div className='w-[80%]  lg:w-[50%]  m-auto flex flex-wrap gap-2 justify-center' >
            <div className='w-[150px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
              <div> <Car strokeWidth={1} /> </div>  <div className='text-muted-foreground text-center'>Model </div> <div className='text-center'>{Data.model}</div>
            </div>
            <div className='w-[150px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
              <div><UserRound strokeWidth={0.75} /></div> <div className='text-muted-foreground' > Ownership</div>  <div>{Data.ownerShip}</div>
            </div>
            <div className='w-[150px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
            <div><Gauge strokeWidth={1} /></div> <div className='text-muted-foreground' >Kms Done</div>  <div> {Data.KmsDone}</div>              
            </div> 
            <div className='w-[150px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
            <div><Armchair strokeWidth={1} /></div> <div className='text-muted-foreground' >Seat Capacity</div>  <div> {Data.Seat}</div>   
            </div>
            <div className='w-[150px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
             <div className='bg-white'><img width={28} src="/gear-shift.png" alt="" />  </div><div className='font-normal text-muted-foreground'>Transmission</div>  <div> {Data.Transmission}</div> 
            </div>
            <div className='w-[150px] p-2 h-[100px] flex flex-col justify-center items-center border border-slate-500 border-opacity-50 rounded-md font-semibold'>
             <div><Fuel strokeWidth={1} /></div>   <div className='text-muted-foreground' >Fuel Type</div>  <div> {Data.Fuel} </div> 
            </div>
        </div>
        </div>
        {/*  Payment  */}
    <div className='text-4xl font-semibold p-3 text-center'>
         Your dream car awaits. Purchase it today
    </div>
      <div className='font-semibold text-center my-6 text-xl'>
       PAY ONLY ₹ { (Data?.price as number).toFixed(2) } TO MAKE THIS YOURS CAR
      </div>
      <div className=" w-[50%] m-auto text-center ">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              {/* @ts-ignore */}
              <CheckoutForm carid={params.id} userID={data?.user?.id! as string}  email={data?.user?.name!} />
            </Elements>
          )}
    </div>
    </div>
    </div>
  )
}

export default page



