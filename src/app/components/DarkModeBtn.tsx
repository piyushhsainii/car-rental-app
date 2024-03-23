"use client"
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CircleUserIcon, LayoutDashboard, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { AnimatedTooltip } from './AnimatedToolTip'
import axios from 'axios'
import { url } from '@/lib/url'

interface Userdata {
      isAdmin :true | false
}

const DarkModeBtn = () => {
    const { data: session, status } = useSession()
    console.log(session, "Session")
    const  { setTheme , theme  } = useTheme()
    const [UserData, setData] = useState<Userdata | null >(null)
    const adminStatus = async()=>{
      // @ts-ignore
    const userEmail =  session?.user?.email ?? null
   const { data } = await axios.post(`/api/userInfo`,{
        id:userEmail
     })
     setData(data.user)
    }
    useEffect(()=>{
      // @ts-ignore
      if(status && status === 'authenticated'){
        adminStatus()
      }
    },[session])

  return (
    <div className="flex items-center gap-4 justify-center" >
        {
          UserData && UserData.isAdmin === true ?
          <div> <Link href={'/Dashboard'}><LayoutDashboard /></Link> </div>: null
        }
        <DropdownMenu > 
        <DropdownMenuTrigger asChild>
            <Button variant="outline"   size="icon">
            <Sun className="h-[1.2rem]   w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute  h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end"  >
            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
            Light
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
            Dark
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        {
           status === 'unauthenticated' &&  
            <Link href={'/login'} >
               <CircleUserIcon className=" text-primary" width={25} height={25} strokeWidth={1} />
            </Link>
            }

            { session && session.user?.image &&
             <AnimatedTooltip
                    items={ 
                        [{
                            id:1,
                            name:session?.user.name ?? "",
                            designation:"",
                            image:session?.user?.image ?? ""
                        }]
                        }
                />  
        }

    </div>

  )
}

export default DarkModeBtn


