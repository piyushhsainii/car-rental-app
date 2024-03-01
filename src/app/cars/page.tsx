import React from 'react'
import NavMenu from '../components/NavMenu'
import { ScrollArea } from "@/components/ui/scroll-area"
import { FilterIcon } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"

const page = () => {
  return (
    <div>
        <NavMenu/>
        <ScrollArea className="h-[80vh] w-[250px] rounded-md border-slate-700 border-opacity-35 border-r p-4">
            <div className='flex gap-3 justify-center'>
                 <FilterIcon width={18} />
                 <div className='font-semibold'>Filter</div>
                 <div className='ml-16 pt-[0.7px] text-sm items-center text-primary underline '>clear all </div>
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40'>
                <div className='font-semibold  mb-4'>Type</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>Hatchback</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Sedan</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> SUV</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Compact SUV</div>
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40' >
                <div className='font-semibold  mb-4'>Fuel</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>Petrol</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Diesel</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> CNG</div>
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40'>
                <div className='font-semibold  mb-4'>Transmission</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>Automatic</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Manual</div>
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40'>
                <div className='font-semibold  mb-4'>Brand</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>Mahindra</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Toyota</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Tata</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Volkswagen</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Skoda</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> Hyundai</div>
             </div>
             <div className='p-4 border-slate-300 border-b border-opacity-40'>
                <div className='font-semibold  mb-4'>Seating Capacity</div>
                <div className='font-semibold flex items-center gap-2' ><div><Checkbox /></div>4</div> 
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> 5</div>
                <div className='font-semibold flex items-center gap-2' > <div><Checkbox /></div> 6+</div>
             </div>
        </ScrollArea>


    </div>
  )
}

export default page