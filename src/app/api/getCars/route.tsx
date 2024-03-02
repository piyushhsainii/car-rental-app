import { PrismaClient   } from "@prisma/client";
import { NextRequest } from "next/server";

interface params {
    filter:string
}
export enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export async function GET(req:NextRequest){

    const  filter  = req.nextUrl.searchParams
    const query = filter.get('Fuel') 
    const sortValue =  filter.get('sortBy')  as SortOrder 

    // const list = quert?.split(',')
    // console.log(list)
    try { 
    const prisma =  new PrismaClient()
          
    if(!sortValue) {
        const Cars = await prisma.cAR.findMany({
            where:{
                Fuel: {
                    in:[ query || "Petrol", "Deisel" ]                
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
        if(sortValue){
            const Cars = await prisma.cAR.findMany({
                orderBy:{
                    price:sortValue  
                },
                where:{
                    Fuel: {
                        in:[ query || "Petrol", "Deisel" ]                
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