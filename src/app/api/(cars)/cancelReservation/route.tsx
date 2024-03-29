import prisma from "@/lib/prismaClient";


export async function POST(req:Request){
    const { carId } = await req.json()

 try {
    await prisma.cAR.update({
        where:{
            id:carId
        },
        data:{
            Availability:"Available"
        }
    })
    await prisma.reserveTable.deleteMany({
        where:{
            carID:carId
        }
    })
    return Response.json({
     success:true   
    },{
        status:200
    })
 } catch (error) {
    return Response.json({
        error:error
    },{
        status:400
    })
 }


}