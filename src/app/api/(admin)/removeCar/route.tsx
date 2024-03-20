import prisma from "@/lib/prismaClient"

export async function POST(req:Request){
    const  { id } = await req.json()

 try {
    await prisma.cAR.delete({
        where:{
            id:id
        }
    })
    return Response.json({
        message:"Deleted Successfully"
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