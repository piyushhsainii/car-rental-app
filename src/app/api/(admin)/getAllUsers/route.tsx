import prisma from "@/lib/prismaClient";

export async function GET(){
    try {
        const users = await  prisma.user.findMany()
        const userCount = await prisma.user.count()
        const generalUsers = await prisma.user.count({
            where:{
                isAdmin:{
                    equals:false
                }
            }
        })
        const AdminUsers = await prisma.user.count({
            where:{
                isAdmin:{
                    equals:true
                }
            }
        })
        return Response.json({
            users,
            userCount,
            generalUsers,
            AdminUsers
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