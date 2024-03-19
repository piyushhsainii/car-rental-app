import prisma from "@/lib/prismaClient";

export async function GET(){
    try {
        const cars = await  prisma.cAR.findMany()
        const carCount = await prisma.cAR.count()
        return Response.json({
            cars,
            carCount
        },{
            status:200
        })
    } catch (error) {
        return Response.json({
            error
        },{
           status:400
        })
    }
}