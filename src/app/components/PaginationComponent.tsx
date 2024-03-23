"use client"
import { Badge } from '@/components/ui/badge'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import React from 'react'

const PaginationComponent = () => { 

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const router = useRouter()
    const prevPageHandler = ()=>{
        setPage(c => c===1 ? c : c-1 )
        router.push(`/cars/${page.toString()}`)
        router.refresh()

    }
    const NextPageHandler = ()=>{
        setPage(c =>  c+1 )
        router.push(`/cars/${page.toString()}`)
        router.refresh()

    }
    return (
        <div className='flex justify-center'>
         <Link href={`/cars?page=${1}`} >
             <div onClick={prevPageHandler}  className='p-2 cursor-pointer'>
               &#x276E;
            </div>
            </Link>
                <Badge className='text-md' variant="outline">
                    {page} / 2
                </Badge>
            <Link href={`/cars?page=${2}`} > 
                <div onClick={NextPageHandler} className='p-2 cursor-pointer'>
                    &#x276F;
                </div>
            </Link>
        </div>
    )
}

export default PaginationComponent