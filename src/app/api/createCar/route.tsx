import prisma from '../../../lib/prismaClient'
import cloudinary from 'cloudinary'

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
    // 
    cloudinary.v2.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
        secure: true 
      });


    try {
        const UploadImage = Img.forEach(async(img:string)=>(
            cloudinary.v2.uploader.upload(img)
        ))
        const ImagesArray = await Promise.all(UploadImage)
        const car = await prisma.cAR.create({
            data:{
                carName,
                Img:ImagesArray,
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