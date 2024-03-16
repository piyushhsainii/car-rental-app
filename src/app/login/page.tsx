import React, { useState } from 'react'
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import ProvidersComponents from '../components/ProvidersComponents';

const auth = async() => {
    const  session = await getServerSession(authOptions)
    console.log(session)
    if(session && session !== null){
        redirect('/')
        return
    }
  return (
        <div className='' >
            <div className="flex justify-between  h-[60px] px-4 " >
            <div className="font-thin text-2xl  p-3 " >
             <Link href={'/'}>HORSEPOWER CARTEL </Link>
            </div>
            </div>
           <ProvidersComponents />
        </div>
    )
      
}

export default auth