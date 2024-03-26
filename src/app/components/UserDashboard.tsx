'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
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
import { ArrowUpRight, Trash, User } from 'lucide-react'
import axios from 'axios'
import { url } from '@/lib/url'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Loading from '../loading'


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

const UserDashboard = ({ data,userCount }: { data: any, userCount:number }) => {
  const router = useRouter()
  const [loading, setloading] = useState(false)

  const removeUserHandler = async (id: string) => {
    setloading(true)
    try {
      const { data } = await axios.post(`${url}/api/removeUser`, {
        id: id
      })
      setloading(false)
      data && toast("User Removed Successfully")
      router.refresh()
    } catch (error) {
      setloading(false)
      toast("Error occured while deleting user")
    }
  }

  const updateUser = (id: string) => async () => {
    setloading(true)
    try {
      const { data } = await axios.post(`${url}/api/adminRole`, {
        id: id, status: true
      })
      if (data && data.updateUser) {
        setloading(false)
        toast("User permission updated successfully. ")
        router.refresh()
      }
    } catch (error) {
      setloading(false)
      console.log(error)
      toast("Something went wrong")
    }
  }
  const updateToUser = (id: string) => async () => {
    setloading(true)
    try {
      const { data } = await axios.post(`${url}/api/adminRole`, {
        id: id, status: false
      })
      setloading(false)
      if (data && data.updateUser) {
        toast("User permission updated successfully. ")
        router.refresh()
      }
    } catch (error) {
      setloading(false)
      console.log(error)
      toast("Something went wrong")
    }
  }

  return (
    <div>
      {/* table start */}
      {
        loading ?
          <Loading />
          :
          <Table>
            <TableCaption>Total Users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableCell colSpan={3}>Total Users</TableCell>
                <TableCell className="text-right"> <div className='flex justify-end items-center'><div> {userCount.toString()} </div> <User width={15} /></div> </TableCell>
              </TableRow>
              <TableRow className='bg-primary dark:bg-primary-foreground hover:bg-primary text-white'>
                <TableHead className="w-[100px] text-white">User ID</TableHead>
                <TableHead className='text-white'>Username</TableHead>
                <TableHead className='text-white'>Email</TableHead>
                <TableHead className="text-right text-white">Manage Permissions</TableHead>
                <TableHead className="text-right text-white"><Trash size={20} color='red' /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                data.map((user: userData) => (
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
                                <button disabled={user.isAdmin === true ? true : false} onClick={updateUser(user.id)} className={`${user.isAdmin === true ? 'cursor-not-allowed' : 'hover:bg-green-800'} bg-green-600 m-4  px-4 py-2 text-white text-md rounded-lg  `}> Allow Admin Access  </button>
                                <button disabled={user.isAdmin === true ? false : true} onClick={updateToUser(user.id)} className={`${user.isAdmin === false ? 'cursor-not-allowed' : 'hover:bg-red-800'} bg-red-600 m-4  px-4 py-2 text-white text-md rounded-lg`}> Remove Admin Access </button>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <div className='flex items-center justify-center '> <div><Trash size={20} color='red' /></div></div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete this car and remove it from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <div className='flex justify-evenly'>
                            <DialogClose>
                              <div className='bg-white px-7 text-slate-700  transition-all duration-300 py-2.5 rounded-md font-semibold text-sm'>Return to Dashboard</div>
                            </DialogClose>
                            <button onClick={() => removeUserHandler(user.id)} className='bg-red-600 px-7 hover:bg-red-800 transition-all duration-300 py-2.5 rounded-md font-semibold text-sm'>Delete</button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
      }

      {/*  */}
    </div>
  )
}

export default UserDashboard