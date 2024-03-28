import React from 'react'
import NavMenu from '../components/NavMenu'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/authOptions'
import prisma from '@/lib/prismaClient'
import ReservationCard from '../components/ReservationCard'

async function getData() {
  const session = await getServerSession(authOptions)
  // @ts-ignore
  const userID = session?.user.id
  const reservations = await prisma.reserveTable.findMany({
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
      <div className="w-[80vw] m-auto p-4 border border-slate-300 border-opacity-50">
        <div className='text-center' >
          YOUR RESERVATIONS
        </div>
      </div>
    </div>
  }

  console.log(reservations , " i am car")
  return (
    <div>
      <NavMenu />
      <div className="w-[80vw] m-auto p-4 border border-slate-300 border-opacity-50">
        <div className='text-center' >
          YOUR RESERVATIONS
        </div>
          <div>
            {
              reservations.map((res)=>(
                <ReservationCard key={res.id} data={res} />
              ))
            }
          </div>
      </div>
    </div>
  )
}

export default page