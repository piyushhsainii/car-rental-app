"use client";
import NavMenu from "@/app/components/NavMenu";
import Loading from "@/app/loading";
import { url } from "@/lib/url";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface CarData {
  id: string;
  carName: string;
  Img: string[];
  brand: string;
  price: Number;
  Fuel: string;
  Seat: string;
  Mileage: Number;
  Availability: string;
  model: string;
  Plate: string;
  Year: string;
  type: string;
  Transmission: string;
  Color: string;
  ownerShip: string;
  KmsDone: string;
}

const UpdateCarInfo = (params: any) => {
  const carid = params.params.carid;

  const [carData, setcarData] = useState<CarData | null>(null);
  const [formData, setFormData] = useState<CarData | null>(null);
  const router = useRouter()
  const getData = async () => {
    const { data } = await axios.post(`${url}/api/getCarInfo`, {
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
    router.refresh()
  }

  const updateChanges = async()=>{
    try {
      const { data } = await axios.post(`${url}/api/updateCarInfo`,{
        carData
      })
      data && toast("Updated Successfully")
      data && router.refresh()
    } catch (error) {
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
        <div className=" flex justify-evenly m-2">
          <div className="underline">back</div>
          {/* CAR DETAIL CONTAINER */}
        <div className="w-[350px] m-5 ">
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
                placeholder={"Enter Product name"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
              <div><label htmlFor="" className="font-semibold">Car Price</label></div>
              <input
              placeholder="Car Price"
                type="number"
                value={`${carData.price.toString()}`}
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
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, ownerShip: e.target.value }))
                }
                value={carData.ownerShip}
                type="text"
                placeholder={"Ownership status"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Kms Done</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, KmsDone: e.target.value }))
                }
                value={carData.KmsDone}
                type="number"
                placeholder={"Kms Done"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Seating Capacity</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Seat: e.target.value }))
                }
                min={1}
                max={8}
                value={carData.Seat}
                type="number"
                placeholder={"Seating Capacity"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-4 items-center  " >
            <div><label htmlFor="" className="font-semibold">Transmission</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Transmission: e.target.value }))
                }
                value={carData.Transmission}
                type="text"
                placeholder={"Transmission"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Fuel Capacity</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Fuel: e.target.value }))
                }
                value={carData.Fuel}
                type="text"
                placeholder={"Fuel Type"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Year</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Year: e.target.value }))
                }
                value={carData.Year}
                type="number"
                placeholder={"Year"}
                className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
              />
            </div>
            <div className="flex justify-between gap-2 items-center  " >
            <div><label htmlFor="" className="font-semibold">Car Reg. Plate</label></div>
              <input
                required={true}
                onChange={(e) =>
                  setcarData((prev) => ({ ...prev!, Plate: e.target.value }))
                    }
                    value={carData.Plate}
                    type="text"
                    placeholder={"Reg Plate"}
                    className="bg-transparent border-slate-300 border rounded-md m-2 px-2 py-1"
                />
              </div>
            </form>
            <div className="flex gap-4 my-4" >
              <button className="bg-red-600 px-3 py-2 rounded-md font-semibold  hover:bg-red-800" onClick={()=>discardChanges} >DISCARD CHANGES</button>
              <button className="bg-green-600 px-3 py-2 rounded-md font-semibold hover:bg-green-800" onClick={updateChanges}  >UPDATE CHANGES</button>
            </div>
        </div>
        {/* Image Component */}

        <div className="flex flex-col w-[350px] " >
        <div className="  px-4 py-2 font-semibold"> 
            Add Image
         </div>
            <input type="file"  className="text-sm cursor-pointer bg-opacity-20  border-green-600 bg-green-600 hover:bg-opacity-100 hover:bg-green-600 duration-300 transition-all" />
            <label htmlFor=""></label>
          <div className="h-[600px]  overflow-y-auto" >
            <hr className="my-4" />
          {
            carData.Img.map((img)=>(
              <div className="" > <button onClick={()=>imageRemoveHandler(img)} className="bg-red-600 px-4 py-2 font-semibold">REMOVE</button> <img src={img} alt="" />  </div>
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
