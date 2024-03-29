"use client"
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { FilterIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryState, parseAsArrayOf , parseAsString, parseAsInteger } from 'nuqs'

const Filter = () => { 
  
  const [type, setcarType] = useQueryState('type', parseAsArrayOf(parseAsString).withDefault([]))
  const [fuel, setFuelType] = useQueryState('Fuel', parseAsArrayOf(parseAsString).withDefault([]))
  const [gear, setGearType] = useQueryState('Gear', parseAsArrayOf(parseAsString).withDefault([]))
  const [brand, setBrand] = useQueryState('brand', parseAsArrayOf(parseAsString).withDefault([]))
  const [seats, setseats] = useQueryState('seats', parseAsArrayOf(parseAsInteger).withDefault([]))

  const router = useRouter()
  const ApplyFilterHandler = () => {
    router.refresh()
  }
  return (
    <ScrollArea className="lg:block w-[20%] lg:w-[240px] rounded-md border-slate-700 border-opacity-15 border-r p-4">
      <div className='flex gap-3 justify-center'>
        <FilterIcon width={18} />
        <div className='font-semibold'>Filter</div>
        <div className='ml-16 pt-[0.7px] text-sm items-center text-primary underline '> <Link href={'/cars'} >clear all</Link>  </div>
      </div>
      <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div> <button onClick={ApplyFilterHandler} className='border-slate-700 border-opacity-35 border text-white bg-blue-400 p-2 rounded-md px-3'>APPLY FILTER</button> </div>
        <div className='font-semibold  mb-4'>Type</div>
        <div className='font-semibold flex items-center gap-2' >
            <div><Checkbox checked={type.includes("Hatchback")}  onCheckedChange={(isChecked) => isChecked ? setcarType(c=>[...c , "Hatchback"])  : setcarType(c=> [...c.filter((item)=> item !== "Hatchback")])} /></div>Hatchback</div>
        <div className='font-semibold flex items-center gap-2' > 
            <div><Checkbox checked={type.includes("Sedan")} onCheckedChange={(isChecked) => isChecked ? setcarType(c=>[...c , "Sedan"])  : setcarType(c=> [...c.filter((item)=> item !== "Sedan")])} /></div> Sedan</div>
        <div className='font-semibold flex items-center gap-2' >
           <div><Checkbox checked={type.includes("SUV")} onCheckedChange={(isChecked) => isChecked ? setcarType(c=>[...c , "SUV"])  : setcarType(c=> [...c.filter((item)=> item !== "SUV")])} /></div> SUV</div>
      </div>
      <div className='p-4 border-slate-300 border-b border-opacity-40' >
        <div className='font-semibold  mb-4'>Fuel</div>
        <div className='font-semibold flex items-center gap-2' >
          <div><Checkbox checked={fuel.includes("Petrol")} onCheckedChange={(isChecked) => isChecked ? setFuelType(c=>[...c , "Petrol"])  : setFuelType(c=>[ ...c.filter((item)=> item !== "Petrol")])} /></div>Petrol</div>
        <div className='font-semibold flex items-center gap-2' >
           <div><Checkbox checked={fuel.includes("Diesel")} onCheckedChange={(isChecked) => isChecked ? setFuelType(c=>[...c , "Diesel"])  : setFuelType(c=> [...c.filter((item)=> item !== "Diesel")])} /></div> Diesel</div>
      </div> 
      <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div className='font-semibold  mb-4'>Transmission</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox checked={gear.includes("Automatic")} onCheckedChange={(isChecked) => isChecked ? setGearType((c)=>[...c , "Automatic"])  : setGearType((c)=> [...c.filter((item)=> item !== "Automatic")])} /></div>Automatic</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox checked={gear.includes("Manual")} onCheckedChange={(isChecked) => isChecked ? setGearType((c)=>[...c , "Manual"])  : setGearType((c)=> [...c.filter((item)=> item !== "Manual")])} /></div> Manual</div>
      </div>
      <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div className='font-semibold  mb-4'>Brand</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox   checked={brand.includes("Audi")} onCheckedChange={(isChecked)=> isChecked ? setBrand((c)=> [...c , "Audi"]) : setBrand((c)=>[...c.filter(car=>car!=="Audi")]) } /></div>AUDI</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={brand.includes("BMW")} onCheckedChange={(isChecked)=> isChecked ? setBrand((c)=> [...c , "BMW"]) : setBrand((c)=>[...c.filter(car=>car!=="BMW")]) } /></div> BMW</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={brand.includes("Mercedes")} onCheckedChange={(isChecked)=> isChecked ? setBrand((c)=> [...c , "Mercedes"]) : setBrand((c)=>[...c.filter(car=>car!=="Mercedes")]) } /></div> Mercedes </div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={brand.includes("Porsche")} onCheckedChange={(isChecked)=> isChecked ? setBrand((c)=> [...c , "Porsche"]) : setBrand((c)=>[...c.filter(car=>car!=="Porsche")]) } /></div> Porsche </div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={brand.includes("Bently")} onCheckedChange={(isChecked)=> isChecked ? setBrand((c)=> [...c , "Bentley"]) : setBrand((c)=>[...c.filter(car=>car!=="Bentley")]) } /></div> Bentley </div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={brand.includes("Skoda")} onCheckedChange={(isChecked)=> isChecked ? setBrand((c)=> [...c , "Skoda"]) : setBrand((c)=>[...c.filter(car=>car!=="Skoda")]) } /></div> Skoda</div>
      </div>
    </ScrollArea>
  )
}

export default Filter