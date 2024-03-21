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
import { DonutChart } from '@tremor/react';
import DonutChartUsageExample from '../components/UserDonutChart'
import CarDonutChartUsageExample from '../components/CarDonutChart'

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
  const { data } = await axios.get(`${url}/api/getAllCars`)
  const { data:UserData } = await axios.get(`${url}/api/getAllUsers`)
  return {data,UserData}
}

const page = async() => { 

  const  { data ,UserData} = await getData()
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
                <DonutChartUsageExample userCount={UserData}  />
              </div>
              <div className='w-[400px] h-[500px] ' > 
                <CarDonutChartUsageExample carCount={data}  />
              </div> 

            </div>
          </TabsContent>
          <TabsContent value="Users">
                <UserDashboard data={UserData}  />
          </TabsContent>
          <TabsContent value="Inventory">
              <CarDashboard data={data}  />
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