import React from 'react'
import NavMenu from '../components/NavMenu'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/authOptions'
import prisma from '@/lib/prismaClient'
import ReservationCard from '../components/ReservationCard'
import Link from 'next/link'

async function getData() {
  const session = await getServerSession(authOptions)
  // @ts-ignore
  const userID = session?.user.id
  const reservations = await prisma.soldTable.findMany({
    where: {
      userID: userID
    },
    include:{
      car:true
    }
  })

  return  reservations
}

const page = async () => {

  const session = await getServerSession(authOptions)
  if (session === null) {
    redirect('/')
    return
  }

  const reservations = await getData()
  if (reservations.length === 0 ) {
    return <div>
      <NavMenu />
      <div className="w-[80vw] m-auto p-4 border border-slate-300 border-opacity-40">
        <div className='text-center' >
          NO PURCHASE HISTORY AVAILABLE
        </div>
        <div className='w-[200px] m-auto my-5 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all duration-300 cursor-pointer'>
            <Link href={'/cars'}>BROWSE COLLECTIONS</Link>
        </div>
      </div>
    </div>
  }

  return (
    <div>
      <NavMenu /> 
      <div className="w-[80vw] m-auto p-4 border border-slate-300 border-opacity-50">
        <div className='text-center ' >
          YOUR PURCHASES
        </div>
          <div>
            {
              reservations.map((res)=>(
                <div className='my-4'><ReservationCard key={res.id} data={res} /></div>
              ))
            }
          </div>
       </div> 
    </div>
  )
}

export default page