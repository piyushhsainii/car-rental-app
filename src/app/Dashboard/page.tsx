import React from 'react'
import NavMenu from '../components/NavMenu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
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

interface CarData {
      id: string,
      carName: string,
      Img: [],
      brand: string,
      price: Number,
      Fuel: string,
      Seat: string,
      Mileage:Number,
      Availability: string,
      model: string,
      Plate: string,
      Year: string,
      type: string,
      Transmission: string,
      Color: string,
      ownerShip: string,
      KmsDone: string
}

export async function getData(){
  const { data } = await axios.get(`${url}/api/getAllCars`)
  const { data:UserData } = await axios.get(`${url}/api/getAllUsers`)
  return {data,UserData}
}

const page = async() => {
  const  { data ,UserData} = await getData()

  return (
    <div>
        <NavMenu />
       <div className='flex  justify-between h-[95vh] border border-white w-[90vw] m-auto'>
       <Tabs defaultValue="Dashboard" className=" w-[100%]">
          <TabsList>
            <TabsTrigger className='m-3' value="Dashboard">Dashboard</TabsTrigger>
            <TabsTrigger className='m-3' value="Users">
              Users
            </TabsTrigger>
            <TabsTrigger className='m-3' value="Inventory">Inventory</TabsTrigger>
          </TabsList>

          {/* USERS CONTENT */}
          <TabsContent value="Users">
            <div>
              {/* table start */}
              <Table>
                <TableCaption>Total Users</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableCell colSpan={3}>Total Users</TableCell>
                    <TableCell className="text-right"> <div className='flex justify-end items-center'><div> {UserData.userCount} </div> <User width={15}/></div> </TableCell>
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
                    UserData.users.map((user:userData)=>(
                      <TableRow>
                      <TableCell className="font-medium w-[200px]"> {user.id} </TableCell>
                      <TableCell> {user.name} </TableCell>
                      <TableCell> {user.email}  </TableCell>
                      <TableCell className="text-right"> 
                      <Dialog>
                        <DialogTrigger>Admin</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Manage User Permission</DialogTitle>
                            <DialogDescription>
                              <div className='flex justify-between items-center p-4 '>
                                  <div> ALLOW ADMIN DASHBOARD ACCESS  </div> <Switch />
                              </div>
                              <button className='bg-green-600 hover:bg-green-800 px-4 py-2 text-white text-md rounded-lg '> Change Permission </button>
  
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
          </TabsContent>
          {/* INventory content */}
          <TabsContent value="Inventory">
            <div>
              {/* table start */}
              <Table>
                <TableCaption>Total Cars</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableCell colSpan={4}>Total Cars</TableCell>
                    <TableCell className="text-right"> <div className='flex justify-end items-center'><div> { data.carCount }</div> <User width={15}/></div> </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-[100px]">Car ID</TableHead>
                    <TableHead>Car Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Reserved</TableHead>
                    <TableHead className="text-right">Update Car Info</TableHead>
                  </TableRow>
                </TableHeader>
                
                <TableBody>
                  {
                    data && data.cars.map((car:CarData)=>(
                      <TableRow>
                      <TableCell className="font-medium w-[200px] text-muted-foreground"> {car.id } </TableCell>
                      <TableCell> { car.carName } </TableCell>
                      <TableCell>{car.price.toLocaleString('en-IN',{style:"currency",currency:"inr"})}</TableCell>
                      <TableCell> {car.Availability} </TableCell>
                      <TableCell className="text-right"> 
                      <Dialog>
                        <DialogTrigger>Admin</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Car Info</DialogTitle>
                            <DialogDescription>
                              <div className='flex justify-between items-center p-4 '>
                                  <div> ALLOW ADMIN DASHBOARD ACCESS  </div> <Switch />
                              </div>
                              <button className='bg-green-600 hover:bg-green-800 px-4 py-2 text-white text-md rounded-lg '> Change Permission </button>
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
          </TabsContent>
        </Tabs>

     
      </div>
    </div>
  )
}

export default page