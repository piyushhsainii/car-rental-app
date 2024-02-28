import { PrismaClient } from "@prisma/client"

export async function POST(req:Request){
    const {
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
        Color
    } = await req.json()
    try {
        const prisma = new PrismaClient()
        const car = await prisma.cAR.create({
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
                Color
            }
        })

    if(!car){
        return Response.json({
            messasge:"Could not create Car"
        },{
            status:400
        })
    }
    return Response.json({
        car
    },{
        status:200
    })
    } catch (error) {
        console.log(error)
        return Response.json({
            message:"Something went wrong"
        })
    }
}