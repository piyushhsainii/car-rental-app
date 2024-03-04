"use client"
import React, { useEffect, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { FilterIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Filter = ({ props }: any) => {
  console.log(props)
  const [type, setcarType] = useQueryState('type', parseAsString.withDefault(''))
  const [fuel, setFuelType] = useQueryState('Fuel', parseAsString.withDefault(''))
  const [gear, setGearType] = useQueryState('Gear', parseAsString.withDefault(''))
  const [brand, setBrand] = useQueryState('brand', parseAsString.withDefault(''))
  const [seats, setseats] = useQueryState('seats', parseAsString.withDefault(''))

  const [Hatchback, setHatchback] = useState(false)
  const [Sedan, setSedan] = useState(false)
  const [SUV, setSUV] = useState(false)

  const [Petrol, setPetrol] = useState(false)
  const [Deisel, setDeisel] = useState(false)

  const [Automatic, setAutomatic] = useState(false)
  const [Manual, setManual] = useState(false)

  const [Bmw, setBmw] = useState(false)
  const [Audi, setAudi] = useState(false)
  const [Skoda, setSkoda] = useState(false)
  const [Bently, setBently] = useState(false)
  const [Mercedes, setMercedes] = useState(false)
  const [Porsche, setPorsche] = useState(false)

  const [Seat4, setSeat4] = useState(false)
  const [Seat5, setSeat5] = useState(false)
  const [Seat6, setSeat6] = useState(false)

  const ApplyFilterHandler = () => {
    if (Hatchback === true) {
      setcarType(c => c.includes("hatchback") ? c : c + "hatchback")
    }
    if (Sedan === true) {
      setcarType(c => c.includes("Sedan") ? c : c + "Sedan")
    }
    if (SUV === true) {
      setcarType(c => c.includes("SUV") ? c : c + "SUV")
    }
    if (Hatchback === false) {
      setcarType(c => c.includes("hatchback") ? c.replace("hatchback", "") : c)
    }
    if (Sedan === false) {
      setcarType(c => c.includes("Sedan") ? c.replace("Sedan", "") : c)
    }
    if (SUV === false) {
      setcarType(c => c.includes("SUV") ? c.replace("SUV", "") : c)
    }
    // 
    if (Petrol === true) {
      setFuelType(c => c.includes("Petrol") ? c : c + 'Petrol')
    }
    if (Deisel === true) {
      setFuelType(c => c.includes("Diesel") ? c : c + 'Diesel')
    }
    if (Petrol === false) {
      setFuelType(c => c.includes("Petrol") ?  c.replace("Petrol", "") : c)
    }
    if (Deisel === false) {
      setFuelType(c => c.includes("Diesel") ?  c.replace("Diesel", "") : c )
    }
    if (Automatic === true) {
      setGearType(c => c.includes("Automatic") ? c : c + 'Automatic')
    }
    if (Manual === true) {
      setGearType(c => c.includes("Manual") ? c : c + 'Manual')
    }
    if (Automatic === false) {
      setGearType(c => c.includes("Automatic") ? c.replace("Automatic", "") : c)
    }
    if (Manual === false) {
      setGearType(c => c.includes("Manual") ? c.replace("Manual", "") : c)
    }
    // brand
    if (Bmw === true) {
      setBrand(c => c.includes("BMW") ? c : c + 'BMW')
    }
    if (Bmw === false) {
      setBrand(c => c.includes("BMW") ?  c.replace("BMW", "") : c)
    }
    if (Audi === true) {
      setBrand(c => c.includes("Audi") ? c : c + 'Audi')
    }
    if (Audi === false) {
      setBrand(c => c.includes("Audi") ?  c.replace("Audi", "") : c)
    }
    if (Skoda === true) {
      setBrand(c => c.includes("Skoda") ? c : c + 'Skoda')
    }
    if (Skoda === false) {
      setBrand(c => c.includes("Skoda") ?  c.replace("Skoda", "") : c)
    }
    if (Bently === true) {
      setBrand(c => c.includes("Bentley") ? c : c + 'Bently')
    }
    if (Bently === false) {
      setBrand(c => c.includes("Bentley") ?  c.replace("Bently", "") : c)
    }
    if (Mercedes === true) {
      setBrand(c => c.includes("Mercedes") ? c : c + 'Mercedes')
    }
    if (Mercedes === false) {
      setBrand(c => c.includes("Mercedes") ?  c.replace("Mercedes", "") : c)
    }
    if (Porsche === true) {
      setBrand(c => c.includes("Porsche") ? c : c + 'Porsche')
    }
    if (Porsche === false) {
      setBrand(c => c.includes("Porsche") ?  c.replace("Porsche", "") : c)
    }
    if (Seat4 === true) {
      setseats(c => c.includes("Porsche") ? c : c + 'Seat4')
    }
    if (Seat4 === false) {
      setseats(c => c.includes("Seat4") ?  c.replace("Seat4", "") : c)
    }
    if (Seat5 === true) {
      setseats(c => c.includes("Seat5") ? c : c + 'Seat5')
    }
    if (Seat5 === false) {
      setseats(c => c.includes("Seat5") ?  c.replace("Seat5", "") : c)
    }
    if (Seat6 === true) {
      setseats(c => c.includes("Seat6") ? c : c + 'Seat6')
    }
    if (Seat6 === false) {
      setseats(c => c.includes("Seat6") ?  c.replace("Seat6", "") : c)
    }
  }
  const clearAllHandler = ()=>{
    setHatchback(false)
    setSedan(false)
    setSUV(false)
  }
  useEffect(()=>{

  },[props])
  return (
    <ScrollArea className="h-[100%] w-[250px] rounded-md border-slate-700 border-opacity-35 border-r p-4">

      <div className='flex gap-3 justify-center'>
        <FilterIcon width={18} />
        <div className='font-semibold'>Filter</div>
        <div className='ml-16 pt-[0.7px] text-sm items-center text-primary underline '> <Link href={'/cars'} onClick={clearAllHandler} >clear all</Link>  </div>
      </div>
      <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div> <button onClick={ApplyFilterHandler} className='border-slate-700 border-opacity-35 border'>APPLY FILTER</button> </div>
        <div className='font-semibold  mb-4'>Type</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox checked={Hatchback} onCheckedChange={() => setHatchback((prev) => !prev)} /></div>Hatchback</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox checked={Sedan} onCheckedChange={() => setSedan((prev) => !prev)} /></div> Sedan</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox checked={SUV} onCheckedChange={() => setSUV((prev) => !prev)} /></div> SUV</div>
        {/* <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Compact SUV</div> */}
      </div>
      <div className='p-4 border-slate-300 border-b border-opacity-40' >
        <div className='font-semibold  mb-4'>Fuel</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox checked={Petrol} onCheckedChange={() => setPetrol((prev) => !prev)} /></div>Petrol</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox checked={Deisel} onCheckedChange={() => setDeisel((prev) => !prev)} /></div> Diesel</div>
      </div>
      <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div className='font-semibold  mb-4'>Transmission</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox checked={Automatic} onCheckedChange={() => setAutomatic((prev) => !prev)} /></div>Automatic</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox checked={Manual} onCheckedChange={() => setManual((prev) => !prev)} /></div> Manual</div>
      </div>
      <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div className='font-semibold  mb-4'>Brand</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox   checked={Audi} onCheckedChange={()=>setAudi((prev)=>!prev)} /></div>AUDI</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={Bmw} onCheckedChange={()=>setBmw((prev)=>!prev)} /></div> BMW</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={Mercedes} onCheckedChange={()=>setMercedes((prev)=>!prev)} /></div> Mercedes </div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={Porsche} onCheckedChange={()=>setPorsche((prev)=>!prev)} /></div> Porsche </div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={Bently} onCheckedChange={()=>setBently((prev)=>!prev)} /></div> Bentley </div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={Skoda} onCheckedChange={()=>setSkoda((prev)=>!prev)} /></div> Skoda</div>
      </div>
      <div className='p-4 border-slate-300 border-b border-opacity-40'>
        <div className='font-semibold  mb-4'>Seating Capacity</div>
        <div className='font-semibold flex items-center gap-2' ><div><Checkbox  checked={Seat4} onCheckedChange={()=>setSeat4((prev)=>!prev)} /></div>4</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox  checked={Seat5} onCheckedChange={()=>setSeat5((prev)=>!prev)} /></div> 5</div>
        <div className='font-semibold flex items-center gap-2' > <div><Checkbox checked={Seat6} onCheckedChange={()=>setSeat6((prev)=>!prev)}  /></div> 6+</div>
      </div>
    </ScrollArea>
  )
}

export default Filter