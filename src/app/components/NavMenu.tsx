'use client'
import DarkModeBtn from "./DarkModeBtn";
import { getServerSession } from "next-auth";
import Logo from "./Logo";
import SignOut from "./SignOut";
import { IconHorse } from "@tabler/icons-react";
import Link from "next/link";
import { signOut } from 'next-auth/react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LogOut, Menu, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";


const NavMenu = () => {
  // const session = await getServerSession()
  const  { setTheme , theme  } = useTheme()

  return (
    <div className="flex justify-between  h-[60px] px-2 ">
      <div className="font-thin text-2xl  p-3 ">
        <Link href={"/"}>HORSEPOWER CARTEL </Link>
      </div>

      <div className="hidden items-center gap-6 justify-center sm:flex">
        <div>
          <DarkModeBtn />
        </div>
        <div className="font-semibold text-sm">
          <SignOut />
        </div>
      </div>

      <div className="flex items-center gap-2  sm:hidden">
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
        <Sheet>
          <SheetTrigger> <Menu/> </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle> 
                <div className="font-thin text-xl  p-3 pb-8 ">
                   <Link href={"/"}>HORSEPOWER CARTEL </Link>
                 </div>
              </SheetTitle>
              <SheetDescription>
                <div>
                  <div className="flex flex-col items-center gap-9 justify-center ">
                    <div>
                     <Link href={'/Dashboard'}> Dashboard</Link>
                    </div>
                    <div className="font-semibold text-sm">

                    <Link href={'/reservation'}>
                      Reservation
                      </Link>
                    </div>
                    <div className="font-semibold text-sm">
                    <Link href={'/purchases'}>
                      Purchases
                      </Link>
                    </div>
                    <button onClick={() => signOut()} >
                      <div> Sign Out</div>
                    </button>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavMenu;
