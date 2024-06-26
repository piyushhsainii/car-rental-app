"use client"
import { LogOut, Menu } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

const SignOut = () => {
  const session = useSession()
  return (
    session.data ?
      <DropdownMenu >
        <DropdownMenuTrigger> <Menu />  </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem> <Link href={'/reservation'}>Reservation</Link> </DropdownMenuItem>
          <DropdownMenuItem> <Link href={'/purchases'}>Purchases</Link> </DropdownMenuItem>
          <DropdownMenuItem>  
              <button onClick={() => signOut()} >
                 <div className="flex justify-between gap-2 "> <div> <LogOut width={17} /></div> <div> Sign Out</div></div>
               </button>
           </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      : null
  )
}

export default SignOut 