import prisma from "@/lib/prismaClient";

export async function GET(){
    try {
        const cars = await  prisma.cAR.findMany()
        const carCount = await prisma.cAR.count() 
        const availableCaras = await prisma.cAR.count({
            where:{
                Availability:"Available"
            }
        })
        const ReservedCaras = await prisma.cAR.count({
            where:{
                Availability:"Reserved"
            } 
        })
        const soldCars = await prisma.cAR.count({
            where:{
                Availability:"Sold"
            }
        })
        return Response.json({
            cars,
            carCount,
            availableCaras,
            ReservedCaras,
            soldCars
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