"use client"
import { CircleUser } from "lucide";
import { signIn, signOut , useSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { AnimatedTooltip } from "./AnimatedToolTip";
import { CircleUserIcon, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"   
import Loading from "../loading";


const NavMenu =() => {    
    const session = useSession()
    console.log(session)
    const  { setTheme , theme  } = useTheme()

    return (
        <div className="flex justify-between  h-[60px] px-4 " >
            <div className="" >
                  { 
                     theme && theme==='dark' ?
                        <Image src={'/Logo3.png'} className="" width={180} height={60} alt="logo"></Image> : 
                        <Image src={'/Logo.png'} className="" width={180} height={60} alt="logo"></Image>
                   }
            </div>
            { session && session.status === 'loading' && <Loading/> }
            {
                 session && session.status === 'unauthenticated' &&
                <div className="flex items-center gap-3 justify-center" >
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
                    <Link href={'/Auth'} >
                        <CircleUserIcon className=" text-primary" width={25} height={25} strokeWidth={1} />
                        </Link>
                </div> 
                    }
            {
                session && session.status === 'authenticated' &&
                 <div className="flex items-center gap-6 justify-center" >
                   <div> 
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
                    </div>              
                   <div>
                        <AnimatedTooltip 
                            items={ 
                                [{
                                    id:1,
                                    name:"Piyush Saini",
                                    designation:"",
                                    image:session?.data?.user?.image ?? "" 
                                }]
                                }
                        /> 
                   </div>
                   <div className="font-semibold text-sm" >
                    <button onClick={()=> signOut()} >
                        <div className="flex"> <div> <LogOut width={18} /></div> <div> Sign Out</div></div>
                    </button>  </div>              
                    
             </div>
            }   
        </div>  
    )
   
}
 
export default NavMenu;