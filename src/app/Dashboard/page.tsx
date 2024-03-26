import React from 'react'
import NavMenu from '../components/NavMenu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios'
import { url } from '@/lib/url'
import UserDashboard from '../components/UserDashboard'
import CarDashboard from '../components/CarDashboard'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions'
import { Plus } from 'lucide-react'
import AddInventory from '../components/AddInventory'
import DonutChartUsageExample from '../components/UserDonutChart'
import CarDonutChartUsageExample from '../components/CarDonutChart'
import prisma from '@/lib/prismaClient'

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

 async function getData(){
  
  const cars = await  prisma.cAR.findMany()
  const carCount = await prisma.cAR.count() 
  const availableCaras = await prisma.cAR.count({
      where:{
          Availability:"Available"
      }
  })
  const ReservedCaras = await prisma.cAR.count({
      where:{
          Availability:"Reserved"
      } 
  })
  const soldCars = await prisma.cAR.count({
      where:{
          Availability:"Sold"
      }
  })
  const UserData =  await prisma.user.findMany()
  const userCount = await prisma.user.count()
  const generalUsers = await prisma.user.count({
    where:{
      isAdmin:false
    }
  })
  const AdminUsers = await prisma.user.count({
    where:{
      isAdmin:false
    }
  })
  console.log(UserData)
  return {UserData,userCount,generalUsers,AdminUsers, cars, carCount , availableCaras , ReservedCaras ,soldCars}
}

const page = async() => { 

  const  { UserData,userCount,generalUsers,AdminUsers, cars, carCount , availableCaras , ReservedCaras ,soldCars} = await getData()
  const session = await getServerSession(authOptions)

  if(session === null){
    redirect('/')
    return
    }

  return (
    <div>
        <NavMenu />
       <div className='flex   justify-between h-[95vh] w-[90vw] m-auto'>
       <Tabs defaultValue="Dashboard" className=" w-[100%]">
          <TabsList>
            <TabsTrigger className='m-3' value="Dashboard">Dashboard</TabsTrigger>
            <TabsTrigger className='m-3' value="Users">
              Users
            </TabsTrigger>
            <TabsTrigger className='m-3' value="Inventory">Inventory</TabsTrigger>
            <TabsTrigger className='m-3' value="Add">  <Plus width={16} /> </TabsTrigger>
          </TabsList>
          <TabsContent value="Dashboard">
            <div className='flex flex-wrap'>
              <div className='w-[400px] h-[500px] ' > 
                <DonutChartUsageExample userCount={userCount} generalUsers={generalUsers} AdminUsers={AdminUsers}/>
              </div>
              <div className='w-[400px] h-[500px] ' > 
                <CarDonutChartUsageExample carCount={carCount} availableCaras={availableCaras} ReservedCaras={ReservedCaras} soldCars={soldCars} />
              </div> 

            </div>
          </TabsContent>
          <TabsContent value="Users">
                <UserDashboard data={UserData} userCount={userCount}  />
          </TabsContent>
          <TabsContent value="Inventory">
              <CarDashboard cars={cars} carCount={carCount} />
          </TabsContent>
          <TabsContent value='Add' >
            <AddInventory />
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}

export default page