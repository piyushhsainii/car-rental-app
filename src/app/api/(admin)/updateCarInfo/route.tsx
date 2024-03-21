import prisma from "@/lib/prismaClient"
import cloudinary from 'cloudinary'
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
        cloudinary.v2.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
            secure: true 
          });

        const FilteredArray = Img.filter((img:string[])=>!img.includes("http://"))

        const transfrom  = FilteredArray.map(async(img:string)=>(
           (await cloudinary.v2.uploader.upload(img)).url
        ))

        const newImageUrls = await Promise.all(transfrom);
        const updatedImageUrls = [...Img, ...newImageUrls];

       if(FilteredArray.length === 0 || !FilteredArray){
        const car = await prisma.cAR.update({
            where:{
                id:id
            },
            data:{
                carName,
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
       } else {
        const car = await prisma.cAR.update({
            where:{
                id:id
            },
            data:{
                carName,
                Img:updatedImageUrls, 
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
       }
       
     } catch (error) {
        console.log(error)
        return Response.json({
            error:error
        },{
            status:400
        })        
     }
}