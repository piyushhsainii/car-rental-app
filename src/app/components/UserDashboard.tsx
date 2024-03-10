'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ArrowUpRight, User } from 'lucide-react'
import axios from 'axios'
import { url } from '@/lib/url'


interface userData {
  id: string,
  name: string,
  email: string,
  image: string, 
  password: string | null,
  isAdmin: Boolean,
  emailVerified: Boolean | null,
  createdAt: string
}

const UserDashboard = ({data}:{data:any}) => {
  const updateUser = async()=>{
    const  { data } = await axios.post(`${url}/api/`)
  }

  return (
    <div>
      {/* table start */}
      <Table>
        <TableCaption>Total Users</TableCaption>
        <TableHeader>
        <TableRow>
            <TableCell colSpan={3}>Total Users</TableCell>
            <TableCell className="text-right"> <div className='flex justify-end items-center'><div> {data.userCount.toString()} </div> <User width={15}/></div> </TableCell>
          </TableRow>
          <TableRow> 
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Manage Permissions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.users.map((user:userData)=>(
              <TableRow key={user.id}>
              <TableCell className="font-medium w-[200px] text-muted-foreground"> {user.id} </TableCell>
              <TableCell> {user.name} </TableCell>
              <TableCell> {user.email}  </TableCell>
              <TableCell className="text-right"> 
              <Dialog>
                <DialogTrigger><div className='flex gap-2 items-center'> <div>{user.isAdmin === true ? "Admin" : "User"}</div> <ArrowUpRight /></div>  </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Manage User Permission</DialogTitle>
                    <DialogDescription>
                    <div className='flex justify-center' >
                      <button disabled={user.isAdmin === true ? true : false} onClick={updateUser} className={`${user.isAdmin === true ? 'cursor-not-allowed' : 'hover:bg-green-800'} bg-green-600 m-4  px-4 py-2 text-white text-md rounded-lg  `}> Allow Admin Access  </button>
                      <button  disabled={user.isAdmin === true ? false : true} className={`${user.isAdmin === false ? 'cursor-not-allowed' : 'hover:bg-red-800'} bg-red-600 m-4  px-4 py-2 text-white text-md rounded-lg`}> Remove Admin Access </button>
                    </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

               </TableCell>
            </TableRow>
            ))
          }
        </TableBody>
      </Table>
      {/*  */}
    </div>
  )
}

export default UserDashboard