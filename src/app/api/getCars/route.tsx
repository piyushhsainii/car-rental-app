import { PrismaClient   } from "@prisma/client";
import { NextRequest } from "next/server";

export enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export async function POST(req:NextRequest){

    const data = await req.json() 
    const params:SortOrder = data.params
    const fuel = data.fuel 
    try { 
    const prisma =  new PrismaClient()
          
    if(!params) {
        const Cars = await prisma.cAR.findMany({
            where:{
                Fuel: {
                    in:[ fuel as string || "Petrol", "Deisel" ]                
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
        if(params){
            const Cars = await prisma.cAR.findMany({
                orderBy:{
                    price:params 
                },
                where:{
                    Fuel: {
                        in:[ fuel as string || "Petrol", "Deisel" ]                
                    }
                }
            })
            console.log(Cars,"data from api")
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