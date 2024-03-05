"use client"
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import React from 'react'

const PaginationComponent = () => {

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const router = useRouter()
    const prevPageHandler = ()=>{
        setPage(c => c===1 ? c : c-1 )
        router.push(window.location.href)

    }
    const NextPageHandler = ()=>{
        setPage(c =>  c+1 )
        router.refresh()
    }
    return (
        <div className='flex justify-center'>
            <div onClick={prevPageHandler}  className='p-2 cursor-pointer'>
               &#x276E;
            </div>
                <Badge className='text-md' variant="outline">
                    {page} / 2
                </Badge>
            <div onClick={NextPageHandler} className='p-2 cursor-pointer'>
                &#x276F;
            </div>
        </div>
    )
}

export default PaginationComponent