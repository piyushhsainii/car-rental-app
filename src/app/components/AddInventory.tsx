"use client"
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { Country, State, City }  from 'country-state-city';
import zod from 'zod'
import { toast } from 'sonner';
import axios from 'axios';
import { url } from '@/lib/url';
import Loading from '../loading';



interface CarData {
    id?: string;
    carName: string;
    Img: string[];
    brand: string;
    price: Number;
    Fuel: string;
    Seat: Number;
    Mileage: Number;
    Availability: string;
    model: string;
    Plate: string;
    Year: Number;
    type: string;
    Transmission: string;
    Color: string;
    ownerShip: Number;
    KmsDone: Number;
}
const AddInventory = () => {

const date = new Date().getFullYear()

const carSchema = zod.object({
    carName:zod.string(),
    price:zod.number().min(1),
    ownerShip:zod.number().max(4),
    KmsDone:zod.number().min(1).max(300000),
    Seat:zod.number().min(1).max(8),
    Year:zod.number().min(1800).max(date),
  
  })
const [LoadingState, setLoading] = useState(false)
const [carData, setcarData] = useState<CarData >({
    carName: '',
    Img: [],
    brand: '',
    price:0,
    Fuel: '',
    Seat: 0,
    Mileage:0,
    Availability: '',
    model: '',
    Plate: '',
    Year: 2000,
    type: '',
    Transmission: '',
    Color: '',
    ownerShip:0,
    KmsDone: 0
});

const [formData, setFormData] = useState<CarData | null>(null);
  const ImageTag = useRef(null)

const clearImgHandler = ()=>{
  setcarData((data)=>({...data,Img:[]}))
  // @ts-ignore
    ImageTag.current.value = ''; 

}

const FileReaderHandler = (e:any)=> {
  const files = [...e.target.files];
if (files === null || files === undefined || files.length === 0) {
  setcarData((data) => ({ ...data, Img: [] }));
  return;
}
files.forEach((file: File) => {
  const transform = new FileReader();
    transform.readAsDataURL(file);
    transform.onloadend = () => {
      setcarData((data) => ({ ...data, Img: [...data.Img, transform.result as string ]}));
    };
});
}

const resetFormHandler = ()=>{
  setcarData({
    carName: '',
    Img: [],
    brand: '',
    price:0,
    Fuel: '',
    Seat: 0,
    Mileage:0,
    Availability: '',
    model: '',
    Plate: '',
    Year: 2000,
    type: '',
    Transmission: '',
    Color: '',
    ownerShip:0,
    KmsDone: 0
})
}

const createCar = async()=>{ 
  setLoading(true)
const isValid = carSchema.safeParse(carData)
  if(isValid.success === false){
    const errorMessage = JSON.parse(isValid.error.message)
    console.log(errorMessage)
    errorMessage.map((error:any)=>(
      toast(error.path + " " + error.message.slice(6))
    ))
  }
  if(carData.type === "null" || carData.Transmission === "null" || carData.brand === "" || carData.brand === "null" || carData.Plate === "null" || carData.brand === "" || carData.Plate === "" || carData.Fuel === "null" || carData.Fuel === ""  ){
    setLoading(false)
    return toast("Please Fill all details")
  } 
  if(carData.Img.length === 0){
    setLoading(false)
    return toast("Please Add Image")
  }

    try {
     const { data } = await axios.post(`${url}/api/createCar`,{
      carName:carData.carName,
      Img:carData.Img,
      brand:carData.brand,
      price:carData.price,
      Fuel:carData.Fuel,
      Seat:carData.Seat,
      Mileage:carData.Mileage,
      Availability:carData.Availability,
      model:carData.model,
      Plate:carData.Plate,
      Year:carData.Year,
      Color:carData.Color,
      type:carData.type,
      Transmission:carData.Transmission,
      ownerShip:carData.ownerShip,
      KmsDone:carData.KmsDone
     })   
     setLoading(false)
     if(data){
      toast("Added successfully")
       }
    } catch (error) {
      setLoading(false)
      toast("Error occured while adding car to inventory")
    }
}

console.log(carData)
  return (
    <div className=" flex justify-evenly m-2">
          {/* CAR DETAIL CONTAINER */}
          {
            LoadingState ? 
            <Loading /> :
        <div className="w-[350px] m-5 ">
            <div className="text-2xl m-5 text-center " >
              ADD YOUR CAR 
            </div>
          <form action="">
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Car Name</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, carName: e.target.value }))
                }
                value={carData?.carName}
                type="text"
                placeholder={"Enter Car name"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
              <div><label htmlFor="" className="font-semibold">Car Price</label></div>
              <input
              placeholder="Car Price"
                type="number"
                value={`${carData?.price.toString()}`}
                min={1}
                onChange={(e) =>
                  setcarData((prev) => ({
                    ...prev!,
                    price: parseFloat(e.target.value),
                  }))
                }
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
              <div><label htmlFor="" className="font-semibold">Car Model</label></div>
              <input
              placeholder="Car Model"
                type="text"
                value={`${carData?.model}`}
                min={1}
                onChange={(e) =>
                  setcarData((prev) => ({
                    ...prev!,
                    model: e.target.value,
                  }))
                }
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
              <div><label htmlFor="" className="font-semibold">Colour</label></div>
              <input
              placeholder="Car Colour"
                type="text"
                value={`${carData?.Color}`}
                min={1}
                onChange={(e) =>
                  setcarData((prev) => ({
                    ...prev!,
                    Color: e.target.value,
                  }))
                }
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Car Ownership</label></div>
              <input
                 min={1}
                 max={4}
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, ownerShip:parseFloat(e.target.value) }))
                }
                value={carData.ownerShip.toString()}
                type="number"
                placeholder={"Ownership status"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1 w-[57%] "
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Kms Done</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, KmsDone: parseFloat(e.target.value) }))
                }
                min={1}
                max={300000}
                value={carData.KmsDone.toString()}
                type="number"
                placeholder={"Kms Done"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1 w-[57%]"
              />
            </div>

            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Mileage</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Mileage: parseFloat(e.target.value) }))
                }
                min={1}
                max={40}
                value={carData.Mileage.toString()}
                type="number"
                placeholder={"Mileage of car"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1 w-[57%]"
              />
            </div>

            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Type</label></div>
              <select name="" id=""
                required={true}
                 onChange={(e) =>
                setcarData((prev) => ({ ...prev!, type: e.target.value }))
              }
                value={carData.type}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1 w-[57%]"
                >
                <option className= "text-black" value="null">Select Type</option>
                <option className= "text-black" value="Sedan">Sedan</option>
                <option className= "text-black"  value="Hatchback">Hatchback</option>
                <option className= "text-black"  value="SUV">SUV</option>
              </select>
            </div>

            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Seating Capacity</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Seat:parseFloat(e.target.value)}))
                }
                min={1}
                max={8}
                value={carData.Seat.toString()}
                type="number"
                placeholder={"Seating Capacity"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1  w-[57%] "
              />
            </div>
            <div className="flex justify-between gap-4 items-center  " >
            <div><label htmlFor="" className="font-semibold">Transmission</label></div>
              <select name="" id=""
              required={true}
              className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1 w-[57%] "
              onChange={(e) =>
                setcarData((prev) => ({ ...prev!, Transmission: e.target.value }))
              }>
              
                  <option className="text-black" value="null">Select Transmission </option>
                  <option className="text-black" value="Automatic">Automatic</option>
                  <option className="text-black" value="Manual">Manual</option>
              </select>

            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Fuel Type</label></div>
            <select name="" id=""
              required={true}
              className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1 w-[57%] "
              onChange={(e) =>
                setcarData((prev) => ({ ...prev!, Fuel: e.target.value }))
              }>
                  <option className="text-black" value="null">Select Fuel Type</option>
                  <option className="text-black" value="Petrol">Petrol</option>
                  <option className="text-black" value="Diesel">Diesel</option>
              </select>
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Year</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Year: parseFloat(e.target.value )}))
                }
                max={date}
                value={carData.Year.toString()}
                type="number"
                placeholder={"Year"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Car Reg. Plate</label></div>
                <select name=""
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1 w-[57%]"
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Plate: e.target.value }))
                    }
                 >
                <option className="bg-primary text-black" value={"null"}> Select State </option>
                { 
                State.getStatesOfCountry("IN").map((states)=>(
                  <option className="dark:bg-primary text-black" value={states.isoCode}> {states.isoCode} </option>
                ))
              }
              </select>
              </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Car Brand</label></div>
                <select name=""
                className="bg-transparent  border-slate-300 border rounded-md m-2 px-2 py-1 w-[57%]"
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, brand: e.target.value })) 
                    }
                 >
                  <option className="dark:bg-primary text-black" value={"null"} >Select Brand</option>
                  <option className="dark:bg-primary text-black"> BMW </option>
                  <option className="dark:bg-primary text-black"> Mercedes </option>
                  <option className="dark:bg-primary text-black"> Audi </option>
                  <option className="dark:bg-primary text-black"> Bentley</option>
                  <option className="dark:bg-primary text-black"> Skoda</option>
                  <option className="dark:bg-primary text-black"> Porsche</option>
              </select>
              </div>
              <div>
                <div className='flex'>
                  <input type="file" multiple accept='image/' onChange={FileReaderHandler} className='cursor-pointer  '  ref={ImageTag}  />
                  <span className='text-[10px] border border-slate-300 text-center border-opacity-30 cursor-pointer ' onClick={clearImgHandler}> CLEAR IMAGES </span>
                </div>
                <div className='w-[330px] overflow-x-auto' >
                    {
                     carData.Img.length > 0 ? 
                      <div className='flex gap-2 m-4'>
                         {  carData.Img.map((img)=>(
                            <img width={40} height={40} src={img} alt="" />
                          ))}
                      </div>
                      :
                     null
                    }
                </div>
              </div> 

            </form>
              <div className='flex gap-2  justify-evenly my-5' >
                <button className='px-4 py-2 bg-red-600 text-sm font-semibold '> BACK TO DASHBOARD  </button>
                <button className='px-12  py-2 bg-green-600 font-semibold' onClick={createCar}> ADD CAR  </button>
              </div>
                <div> 
                   <button className='px-4 py-2 w-[100%] bg-gray-600 text-sm font-semibold' onClick={resetFormHandler} > RESET  </button>
                </div>
        </div>
          }

        </div>
  )
}

export default AddInventory