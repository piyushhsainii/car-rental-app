import prisma from "@/lib/prismaClient"

export async function POST(req:Request){
    const { id,
            carName,
            Img,
            brand,
            price,
            Fuel,
            Seat,
            Mileage,
            Availability,
            model,
            Plate,
            Year,
            type,
            Transmission, 
            ownerShip,
            KmsDone } = await req.json()

     try {
        const car = await prisma.cAR.update({
            where:{
                id:id
            },
            data:{
                carName,
                Img,
                brand,
                price,
                Fuel,
                Seat,
                Mileage,
                Availability,
                model,
                Plate,
                Year,
                type,
                Transmission,
                ownerShip,
                KmsDone
            }
        })
        return Response.json({
            car
        },{status:200})
     } catch (error) {
        return Response.json({
            error:error
        },{
            status:400
        })        
     }
}