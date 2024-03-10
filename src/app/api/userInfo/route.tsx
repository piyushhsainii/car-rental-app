import { prisma } from "@/lib/prismaClient"

export async function POST(req:Request){
    const { id } = await req.json()
    try {
        const user = await prisma.user.findUnique({ 
            where:{
                email:id
            },
         
        })
        if(!user){
            return Response.json({
                message:"Could not fecth user"
            },{
                status:400
            })
        }
        return Response.json({
            user
        },{
            status:200
        })
    } catch (error) {
        return Response.json({
            error:"Something went wrong"
        },{
            status:400
        })
    }
}