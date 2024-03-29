import prisma from "@/lib/prismaClient"

export async function POST(req:Request){

    const { id , userID, userName, userEmail , carID } = await req.json()

 try {

  const isReserved =   await prisma.cAR.findFirst({
        where:{
            id:id
        },
    })

    if(isReserved?.Availability === "Sold" ){
        return Response.json({
            message:"This Car is already Sold"
        },{
            status:400
        })
    }

    await prisma.cAR.update({
        where:{
            id:id 
        },
        data:{
            Availability:"Sold" 
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