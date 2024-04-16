import prisma from '../../../../lib/prismaClient'
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
        const FilteredArray = Img.filter((img:string[])=>!img.includes("http://"))
        const UploadedArray = Img.filter((img:string[])=>img.includes("http://"))
        const UploadImage = FilteredArray.map(async(img:string)=>(
            (await cloudinary.v2.uploader.upload(img)).url
        ))

        const ImagesArray = await Promise.all(UploadImage)
        const FinalArray = [...UploadedArray, ...ImagesArray]
        console.log(ImagesArray)
        const car = await prisma.cAR.create({
            data:{
                carName,
                Img:FinalArray,
                brand,
                price,
                Fuel,
                Seat,
                Mileage,
                Availability:'Available',
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
    return Response.json({
        car
    },{
        status:200
    })
    } catch (error) {
        console.log(error)
        return Response.json({
            message:"Something went wrong"
        },{
            status:400
        })
    }
}