import { Prisma, PrismaClient } from "@prisma/client";

export async function GET(){
    
    try {
    const prisma = new PrismaClient()
    const count = await prisma.cAR.count()
    const randomCars = await prisma.$queryRaw(Prisma.sql`SELECT * FROM "CAR" ORDER BY RANDOM()  LIMIT 2 `);
    return Response.json({
        randomCars
    })
} catch (error) {
    return Response.json({
        error:"Something went wrong fething data"
    },{
        status:400
    })
}
}