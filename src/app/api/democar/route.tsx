import prisma from "@/lib/prismaClient";

export async function POST(){
    const car = await prisma.cAR.findMany()
    return Response.json(car)
}