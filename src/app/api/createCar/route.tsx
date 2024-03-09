import { prisma } from '../../../lib/prismaClient'

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
        Color,
        ownerShip,
        KmsDone
    } = await req.json()
    try {
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
                Color,
                ownerShip,
                KmsDone
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