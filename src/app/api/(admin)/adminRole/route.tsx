import prisma from "@/lib/prismaClient"


export async function POST(req:Request){
    type statusSchema = true | false
    const { id ,status  }:{id:any,status:statusSchema} = await req.json()
    try {
        const user = await prisma.user.findFirst({
            where:{
                id:id 
            }
        })
        if(!user){
            return Response.json({
                message:"Could not fetch user"
            },{
                status:400
            })
        }
        const updateUser = await prisma.user.update({
            data:{
                isAdmin:status
            },
            where:{
                id:id
            }
        })
        return Response.json({
            updateUser
        },{
            status:200
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            error:error
        },{
            status:400
        })
    }
}