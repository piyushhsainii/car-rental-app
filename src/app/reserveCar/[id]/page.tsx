import React from 'react'
import NavMenu from '../../components/NavMenu'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prismaClient'
import { Download } from 'lucide-react'
import Link from 'next/link'
import { redis } from '@/lib/getRedisUrl'

async function getData({ id }: { id: string }) {
    const data = await prisma.reserveTable.findFirst({
        where: {
            carID: id
        }
    })
    const car = await prisma.cAR.findFirst({
        where:{
            id:data?.carID
        }
    })
    return {data,car}
}

const page = async ({ params }: { params: any }) => {

    const {data, car} = await getData(params.id)
    const session = await getServerSession(authOptions)

    if (session === null) {
        toast("Please Login to access this resource")
        return redirect('/')
    }
    redis.del("cars")
    return (
        <div>
            <NavMenu />
            <div className="w-[80vw] m-auto p-4 border border-slate-300 border-opacity-50">
               <div className='flex flex-col md:flex-row  items-start md:items-center justify-between'>
                 <h2 className='font-semibold text-3xl w-[80%]  sm:w-[65%] p-4 pr-0'>Congratulations on Your Car Reservation!</h2>
                <div className='flex gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all duration-300 cursor-pointer'> <span><Download width={16}/></span> <span className='font-semibold'>Download Receipt</span>  </div>
                </div>
                <div className='text-lg font-semibold p-4 '>
                   <div> Dear {session.user?.name},</div>
                <div className='my-3 text-sm md:text-lg '>
                   We're thrilled to inform you that your reservation for your {car?.carName ?? "Car"}  with HorsePower Cartel has been successfully received! 🚗
                </div>
                </div>
                <h3 className='text-xl px-4 py-1 font-semibold '>Reservation Details:</h3>
                <div className="flex justify-between flex-wrap m-3 border-t border-opacity-40 ">
                    <div className='w-[200px] p-4 font-semibold'>    <div className='text-muted-foreground'>Booked by : </div>{data?.userName} </div>
                    <br />
                    <div className='w-[200px] p-4  font-semibold overflow-ellipsis '>   <div className='text-muted-foreground block'>Your Email Address:</div> <div>{data?.userEmail}</div> </div>
                    <br />
                    <div className='w-[200px] p-4  font-semibold'>   <div className='text-muted-foreground'>Reservation Date:</div> {data?.time.toLocaleDateString()}</div>
                    <br />
                    <div className='w-[200px] p-4  font-semibold'>   <div className='text-muted-foreground'>Reservation Timing: </div>{data?.time.toLocaleTimeString()}</div>
                </div>
                <div className='p-4 text-sm sm:text-base font-thin flex gap-2'>
                     <Link className='bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-800 transition-all duration-300 cursor-pointer' href={'/cars'}> BROWSE COLLECTIONS </Link> 
                     <Link className='bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-800 transition-all duration-300 cursor-pointer' href={'/reservation'}>MY ALL RESERVATIONS</Link> 
                </div>
                <ol>
                    {/* <li><strong>Confirmation Email:</strong> You will receive a confirmation email shortly with all the reservation details.</li> */}
                    {/* <li><strong>Personalized Assistance:</strong> Our team will reach out to you within the next 24 hours to discuss the next steps and assist you with any queries you may have.</li> */}
                    {/* <li><strong>Schedule a Test Drive:</strong> If you haven't had a chance to test drive your reserved car yet, we'll arrange a convenient time for you to experience it firsthand.</li> */}
                </ol>
                <div className="p-4">
                    <h3 className='text-lg font-semibold py-2'>Exclusive Benefits for Reserving with Us:</h3>
                    <ul className='font-semibold'>
                        <li className='my-4'> <span className='text-muted-foreground font-semibold'>Priority Access - </span> You'll be among the first to get behind the wheel of your dream car.</li>
                        <li className='my-4'><span className='text-muted-foreground font-semibold'>Special Offers:</span> Stay tuned for exclusive offers and deals reserved just for our valued customers like you.</li>
                        <li className='my-4'><span className='text-muted-foreground font-semibold'>Dedicated Support:</span> Our team is committed to providing you with exceptional service every step of the way.</li>
                    </ul>
                </div>

                <div className='p-4 text-md font-semibold'>
                    Stay Connected: Follow us on Instagram for the latest updates, car tips, and exciting announcements!
                </div>

                <div className='p-4'>
                    Thank you for choosing Horsepower Cartel for your automotive needs. We're honored to be a part of your journey towards owning your dream car.
                    <br />
                    If you have any immediate questions or concerns, feel free to contact us at +91 XXXX99990.
                </div>
             <div className='p-4 font-semibold'>
                Best Regards, <br></br>
                Horsepower Cartel
             </div>
            </div>
        </div>
    )
}

export default page