import { PrismaClient } from "@prisma/client";

export async function GET(){
    try {
    const prisma = new PrismaClient()
    const count = await prisma.cAR.count()
    const randomNo = Math.floor(Math.random()*count)
    const randomCars = await prisma.cAR.findMany({
        skip:randomNo,
    })
        return Response.json({
            randomCars
        },{
            status:200
        })
} catch (error) {
    return Response.json({
        error:"Something went wrong fething data"
    },{
        status:400
    })
}
}