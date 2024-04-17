"use client";
import NavMenu from "@/app/components/NavMenu";
import Loading from "@/app/loading";
import { url } from "@/lib/url";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import zod from 'zod'
import { Country, State, City }  from 'country-state-city';
import Link from "next/link";
interface CarData {
  id: string;
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
const date = new Date().getFullYear()

const carSchema = zod.object({
  carName:zod.string(),
  price:zod.number().min(1),
  ownerShip:zod.number().max(4),
  KmsDone:zod.number().min(1).max(300000),
  Seat:zod.number().min(1).max(8),
  Year:zod.number().max(date),

})

const UpdateCarInfo = (params: any) => {

  const carid = params.params.carid;
  const [carData, setcarData] = useState<CarData | null>(null);
  const [formData, setFormData] = useState<CarData | null>(null);
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const getData = async () => {
    const { data } = await axios.post(`/api/getCarInfo`, {
      id: carid, 
    });
    setcarData(data.car);
    setFormData(data.car);
  };

  const imageRemoveHandler = (id:string)=>{
    const updatedArray =  carData?.Img.filter((img)=>img !== id) 
     setcarData((data)=>({...data!,Img:updatedArray!}))
  }

  const discardChanges = ()=>{
   return redirect('/Dashboard')
  }
  const id = params.params.carid
  
  const imageRemoveHandler2 = (e:any) => {
    const imageArray = [...e.target.files]

    if (imageArray === null || imageArray === undefined || imageArray.length === 0) {
      return;
    }

    imageArray.forEach((img:File)=>{

      const transform = new FileReader()
      transform.readAsDataURL(img)
      transform.onloadend = () => {
        setcarData((prevData: CarData | null) => {
          if (prevData === null) {
            return null; // Handle null case if needed
          }
          return {
            ...prevData,
            Img: [...prevData.Img, transform.result as string],
          };
        });
      };
    })
  }

  // API TO UPDATE CAR INFO 
  const updateChanges = async()=>{
    setloading(true)
    try {
      const isValid =  carSchema.safeParse({
        carName:carData?.carName,
        price:carData?.price,
        ownerShip:carData?.ownerShip,
        KmsDone:carData?.KmsDone,
        Seat:carData?.Seat,
        Year:carData?.Year
      })

      if(isValid.success === false){
        const errorMessage = JSON.parse(isValid.error.message)
        errorMessage.map((error:any)=>(
          toast(error.message)
        ))
        setloading(false)
        return
      }
      if(carData === formData){
        setloading(false)
        return toast("Make some changes to update info")
      }
      const { data } = await axios.post(`${url}/api/updateCarInfo`,{
        id:id,
        carName:carData?.carName,
        Img:carData?.Img,
        brand:carData?.brand,
        price:carData?.price,
        Fuel:carData?.Fuel,
        Seat:carData?.Seat,
        Mileage:carData?.Mileage,
        Availability:carData?.Availability,
        model:carData?.model,
        Plate:carData?.Plate,
        Year:carData?.Year,
        type:carData?.type,
        Transmission:carData?.Transmission, 
        ownerShip:carData?.ownerShip,
        KmsDone:carData?.KmsDone
      })
      data && toast("Updated Successfully")
      // redis.del("cars")
      setloading(false)
      data && router.refresh()

    } catch (error) {
      setloading(false)
      console.log(error)
      toast('Error occured while updating')
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <NavMenu />
      {carData === null || formData === null ? (
        <Loading />
      ) : (

          loading ? 
          <Loading />
          : 
        <div className=" flex flex-col md:flex-row justify-evenly my-2 max-w-[1200px] m-auto">
          <div className="underline  m-auto md:my-5"> <Link href={'/Dashboard'}>back</Link> </div>
          {/* CAR DETAIL CONTAINER */}
        <div className="w-[350px] my-5 m-auto">
            <div className="text-2xl m-5 " >
              UPDATE YOUR CAR INFO
            </div>
          <form action="">
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Car Name</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, carName: e.target.value }))
                }
                value={carData.carName}
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
                value={`${carData.price.toString()}`}
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
                {
                  carData.Transmission === "Automatic" ? 
                 <>
                  <option className="text-black" value="Automatic">Automatic</option>
                   <option className="text-black" value="Manual">Manual</option>
                  </>
               : 
                <>
                <option className="text-black" value="Manual">Manual</option>
                <option className="text-black" value="Automatic">Automatic</option>
               </>
                }
                
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
               {
                  carData.Fuel === "Petrol" ? 
                 <>
                  <option className="text-black" value="Petrol">Petrol</option>
                   <option className="text-black" value="Diesel">Diesel</option>
                  </>
               : 
                <>
                <option className="text-black" value="Diesel">Diesel</option>
                <option className="text-black" value="Petrol">Petrol</option>
               </>
                }
              </select>
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Year</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Year: parseFloat(e.target.value) }))
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
                  id="">
                  <option className="bg-primary text-black" value="">{carData.Plate}</option>
                { 
                State.getStatesOfCountry("IN").map((states)=>(
                  <option className="bg-primary text-black" value=""> {states.isoCode} </option>
                ))
              }
              </select>
              </div>
            </form>
            <div className="flex gap-4 my-4" >
              <button className="bg-red-600 px-3 py-2 rounded-md font-semibold  hover:bg-red-800" onClick={discardChanges} > <Link href={'/Dashboard'}>DISCARD CHANGES</Link> </button>
              <button className="bg-green-600 px-3 py-2 rounded-md font-semibold hover:bg-green-800" onClick={updateChanges}  >UPDATE CHANGES</button>
            </div>
        </div>
        {/* Image Component */}

        <div className="flex flex-col w-[350px]  m-auto " >
        <div className="  px-4 py-2 font-semibold"> 
            Add Image
         </div>
            <input type="file" multiple onChange={imageRemoveHandler2}  className="text-sm cursor-pointer bg-opacity-20  border-green-600 bg-green-600 hover:bg-opacity-100 hover:bg-green-600 duration-300 transition-all" />
            <label htmlFor=""></label>
          <div className="h-[600px]  overflow-y-auto" > 
            <hr className="my-4" />
          {
            carData.Img.map((img)=>(
              <div className="" > <button onClick={()=>imageRemoveHandler(img)} className="bg-red-600 px-4  py-2 font-semibold">REMOVE</button> <img className="max-h-[400px] max-w-[300px] " src={img} alt="" />  </div>
            ))
          }
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCarInfo;
