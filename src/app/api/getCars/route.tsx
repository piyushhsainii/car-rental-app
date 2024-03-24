import prisma from '../../../lib/prismaClient'
import { NextRequest } from "next/server";

enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export async function POST(req:NextRequest){

    const data = await req.json() 
    const params:SortOrder = data.sortBy
    const fuel = data.Fuel
    const fuelSplit = fuel === undefined || fuel === "" ? null : fuel.split(',')
    const type = data.type
    const typeSplit = type === undefined || type === "" ? null : type.split(',')
    const gear:string = data.Gear
    const gearSplit = gear === undefined || gear === "" ? null : gear.split(',')
    const brand = data.brand
    const brandSplit = brand === undefined || brand === "" ? null : brand.split(',')
    const seat = data.seat
    const seatSplit = seat === undefined || seat === "" ? null : seat.split(',')
    const page = data.page

    let skip 
    if(page){ 
        skip = ((page - 1)* 2 )
    }
    try { 
    if(!params) {
        const Cars = await prisma.cAR.findMany(
            {
            where:{
                Fuel: {
                    in: fuelSplit || ["Petrol", "Diesel" ]                
                },
                type:{
                    in:typeSplit ||  ["Sedan", "SUV", "Hatchback" ]
                }
                ,
                Transmission:{
                    in:gearSplit || [ "Automatic" , "Manual"]
                },          
                brand:{
                    in:brandSplit || [ "Mercedes" , "Audi", "BMW", "Bentley", "Skoda", "Porsche"]
                },
                Seat:{
                    in:seatSplit || [1,2,3,4,5,6]
                }
                
            },
            skip:skip
        }
    )
    console.log(Cars,"BACKEND DATA")

        return Response.json({
            data:Cars
        },
        {
            status:200
        })
        }
        if(params){
            const Cars = await prisma.cAR.findMany(
                {
                orderBy:{
                    price:params 
                },
                where:{
                    Fuel: {
                        in: fuelSplit || ["Petrol", "Diesel" ]                
                    },
                    type:{
                        in:typeSplit ||  ["Sedan", "SUV", "Hatchback" ]
                    }
                    ,
                    Transmission:{
                        in:gearSplit || [ "Automatic" , "Manual"]
                    },          
                    brand:{
                        in:brandSplit || [ "Mercedes" , "Audi", "BMW", "Bentley", "Skoda", "Porsche"]
                    },
                    Seat:{
                        in:seatSplit || [1,2,3,4,5,6]
                    }
                },
              skip:skip

            }
        )
       
        return Response.json({
            data:Cars
        },
        {
            status:200
        })
        } 
    } catch (error) {
        console.log(error )
        return Response.json({
            error:"Error occured while fetching data"
        },{
            status:400
        })
    }
}