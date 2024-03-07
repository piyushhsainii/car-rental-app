import { PrismaClient   } from "@prisma/client";
import { NextRequest } from "next/server";

export enum SortOrder {
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
    console.log(gear, "this is gear")
    const gearSplit = gear === undefined || gear === "" ? null : gear.split(',')
    const brand = data.brand
    const brandSplit = brand === undefined || brand === "" ? null : brand.split(',')
    const seat = data.seat
    const seatSplit = seat === undefined || seat === "" ? null : seat.split(',')
    const page = data.page
    let skip 
    if(page){
        skip = ((page - 1)*2)
    }
    console.log(brand, 'vlaue of nski')
    try { 
    const prisma =  new PrismaClient()
    if(!params) {
        const Cars = await prisma.cAR.findMany({
            where:{
                Fuel: {
                    in: fuelSplit || ["Petrol", "Deisel" ]                
                },
                type:{
                    in:typeSplit ||  ["Sedan", "SUV", "hatchback" ]
                }
                ,
                Transmission:{
                    in:gearSplit || [ "Automatic" , "Manual"]
                },          
                brand:{
                    in:brandSplit || [ "Mercedes" , "Audi", "BMW", "Bentley", "Skoda", "Porsche"]
                },
                Seat:{
                    in:seatSplit || ["4","5","6"]
                }
            },
            skip:skip,
            take:2

    
        })
        return Response.json({
            data:Cars
        },
        {
            status:200
        })
        }
        if(params){
            const Cars = await prisma.cAR.findMany({
                orderBy:{
                    price:params 
                },
                where:{
                    Fuel: {
                        in: fuelSplit || ["Petrol", "Deisel" ]                
                    },
                    type:{
                        in:typeSplit ||  ["Sedan", "SUV", "hatchback" ]
                    }
                    ,
                    Transmission:{
                        in:gearSplit || [ "Automatic" , "Manual"]
                    },          
                    brand:{
                        in:brandSplit || [ "Mercedes" , "Audi", "BMW", "Bentley", "Skoda", "Porsche"]
                    },
                    Seat:{
                        in:seatSplit || ["4","5","6"]
                    }
                }
            })
        return Response.json({
            data:Cars
        },
        {
            status:200
        })
        } 
    } catch (error) {
        console.log(error)
        return Response.json({
            error:"Error occured while fetching data"
        },{
            status:400
        })
    }
}