"use client"
import React, { useEffect, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { FilterIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { usePathname , useRouter } from 'next/navigation'

const Filter = ({props}:any) => {
    console.log(props)
    const url = usePathname()
    const router = useRouter()

    const [Hatchback, setHatchback] = useState(false)
    const [Sedan, setSedan] = useState(false)
    const [SUV, setSUV] = useState(false)

    const [Petrol, setPetrol] = useState(false)
    const [Deisel, setDeisel] = useState(false)

    const type:string[] = []
    const Fuel:string[] = []
    const Transmission:string[] = []
    const Brand:string[] = []
    const Seats:string[] = []

    if(Hatchback===true){
      type.push('hatchback')
    } 
    if(Sedan===true){
      type.push('sedan')
    } 
    if(SUV===true){
      type.push('SUV')
    } 
    if(Petrol===true){
      Fuel.push('petrol')
    } 
    if(Deisel===true){
      Fuel.push('fuel')
    } 

    const ApplyFilterHandler = ()=>{  
    const stringType = type.map((item)=>item) 
    const stringFuel = Fuel.map((item)=>item) 
    const stringTransmission = Transmission.map((item)=>item) 
    if(type.length === 0 ){
      return null
    } else {
      router.push(`?${type.length > 0 ? `type=${ stringType }`:  null} 
      ${Fuel.length > 0 ? `fuel=${stringFuel}` : null } 
      ${Transmission.length > 0 ? `transmission=${stringTransmission}` : null }
      `)
    }

    }

  return (
    <ScrollArea className="h-[100%] w-[250px] rounded-md border-slate-700 border-opacity-35 border-r p-4">

    <div className='flex gap-3 justify-center'>
        <FilterIcon width={18} />
        <div className='font-semibold'>Filter</div>
        <div className='ml-16 pt-[0.7px] text-sm items-center text-primary underline '> <Link href={'/cars'}>clear all</Link>  </div>
    </div>
    <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div> <button onClick={ApplyFilterHandler} className='border-slate-700 border-opacity-35 border'>APPLY FILTER</button> </div>
        <div className='font-semibold  mb-4'>Type</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox checked={Hatchback} onCheckedChange={()=>setHatchback((prev)=>!prev)} /></div>Hatchback</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox checked={Sedan} onCheckedChange={()=>setSedan((prev)=>!prev)} /></div> Sedan</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox checked={SUV} onCheckedChange={()=>setSUV((prev)=>!prev)}/></div> SUV</div>
        {/* <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Compact SUV</div> */}
    </div>
    <div className='p-4 border-slate-300 border-b border-opacity-40' >
        <div className='font-semibold  mb-4'>Fuel</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox checked={Petrol} onCheckedChange={()=>setPetrol((prev)=>!prev)}  /></div>Petrol</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox checked={Deisel} onCheckedChange={()=>setDeisel((prev)=>!prev)} /></div> Diesel</div>
    </div>
    <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div className='font-semibold  mb-4'>Transmission</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>Automatic</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Manual</div>
    </div>
    <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div className='font-semibold  mb-4'>Brand</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>AUDI</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> BMW</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Mercedes </div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Porsche </div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Bentley </div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Skoda</div>
    </div>
    <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div className='font-semibold  mb-4'>Seating Capacity</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>4</div> 
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> 5</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> 6+</div>
    </div>
    </ScrollArea>
  )
}

export default Filter