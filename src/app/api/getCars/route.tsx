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
    const type = data.type
    const gear = data.Gear
    const brand = data.brand
    const seat = data.seat
    const page = data.page
    let skip 
    if(page){
        skip = (page - 1)*2
    }

    try { 
    const prisma =  new PrismaClient()
          
    if(!params) {
        const Cars = await prisma.cAR.findMany({
            where:{
                Fuel: {
                    in:[ fuel as string || "Petrol", "Deisel" ]                
                },
                type:{
                    in:[ type || "Sedan", "SUV", "hatchback" ]
                }
                ,
                Transmission:{
                    in:[ gear || "Automatic", "Manual" ]
                },          
                brand:{
                    in:[ brand || "BMW", "Audi", "Bentley", "Mercedes","Porsche","Skoda"]
                },
                Seat:{
                    in:[seat || "4","5","6"]
                }
            },
            skip:1,
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
                        in:[ fuel as string || "Petrol", "Deisel" ]                
                    },
                    type:{
                        in:[ type || "Sedan", "SUV", "hatchback" ]
                    }
                    ,
                    Transmission:{
                        in:[ gear || "Automatic", "Manual" ]
                    },          
                    brand:{
                        in:[ brand || "BMW", "Audi", "Bentley", "Mercedes","Porsche","Skoda"]
                    },
                    Seat:{
                        in:[seat || "4","5","6"]
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