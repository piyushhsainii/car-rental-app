import { prisma } from "@/lib/prismaClient";

export async function GET(){
    try {
        const users = await  prisma.user.findMany()
        const userCount = await prisma.user.count()
        return Response.json({
            users,
            userCount
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