import prisma from "@/lib/prismaClient"

export async function POST( req:Request){
    const { carID } = await req.json()

  try {
    const reserved = await prisma.reserveTable.findFirst({
        where:{
            carID:carID
        }
    })
    return Response.json({
        reserved
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