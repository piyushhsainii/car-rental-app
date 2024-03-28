import prisma from "@/lib/prismaClient"

export async function POST(req:Request){

    const { id , userID, userName, userEmail , carID } = await req.json()

 try {

  const isReserved =   await prisma.cAR.findFirst({
        where:{
            id:id
        },
    })

    if(isReserved?.Availability === "Reserved" || isReserved?.Availability === "Sold" ){
        return Response.json({
            message:"This Car is already reserved"
        },{
            status:400
        })
    }

    await prisma.cAR.update({
        where:{
            id:id 
        },
        data:{
            Availability:"Reserved" 
        }
    })
    await prisma.reserveTable.create({
        data:{
            userID:userID ,
            userName ,
            userEmail,
            carID
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