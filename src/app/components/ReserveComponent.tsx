"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

const ReserveComponent = ({data}:{data:string}) => {

    const session = useSession()
    const sendToast = ()=>{
        toast("Log In to Reserve your car")
    }
  return (
    <div className=' font-semibold text-lg flex justify-center items-center'>
        <button className=' border border-slate-400   p-4 rounded-md border-opacity-55 duration-300 transition-all hover:border-opacity-100'>
            {
                session && session.status === 'unauthenticated' ? 
                <div onClick={sendToast} >  Reserve this Car  </div>
                 :
                <Link href={`/Booking/${data}`}>  Reserve this Car</Link>
            }
        </button>
    </div>
  )
}

export default ReserveComponent