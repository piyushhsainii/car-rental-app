import prisma from "@/lib/prismaClient"

export async function POST(req:Request){
    const { id } = await req.json()

    const car = await prisma.cAR.update(({
        where:{
            id:id
        },
        data:{
            Availability:'Reserved'
        }
    }))

}