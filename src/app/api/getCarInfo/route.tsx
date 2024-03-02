import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const { id } = await req.json()
    try {
        const prisma = new PrismaClient()
        const car = await prisma.cAR.findUnique({
            where:{
                id:id
            }
        })
        return Response.json({
            car:car
        },{
            status:200
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            error:"Error occured fetching data"
        },{
            status:400
        })
    }
}