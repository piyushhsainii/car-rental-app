import prisma from "@/lib/prismaClient";

export async function GET(){
    const car = await prisma.cAR.deleteMany()
    return Response.json({
        car
    })
}