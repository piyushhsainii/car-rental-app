import { Prisma} from "@prisma/client";
import prisma from '../../../lib/prismaClient'

export async function GET(){
    
    try {
    const count = await prisma.cAR.count()
    const randomCars = await prisma.$queryRaw(Prisma.sql`SELECT * FROM "CAR" ORDER BY RANDOM()  LIMIT 3 `);
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