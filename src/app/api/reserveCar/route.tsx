import prisma from "@/lib/prismaClient"

export async function POST(req:Request){

    const { id } = await req.json()

 try {
    await prisma.cAR.update({
        where:{
            id:id 
        },
        data:{
            Availability:"Reserved"
        }
    })
    return Response.json({
        success:true
    })
 } catch (error) {
    return Response.json({
        error:error
    })
 }

}