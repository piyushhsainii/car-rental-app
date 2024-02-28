import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client"
import { SignJWT } from 'jose'

export async function POST(req:Request){
    try {
        const  { email, password } = await req.json()

        const prisma = new PrismaClient()
        const user = await prisma.user.findFirst(
            {
                where: {
                        email
                    }
            })
        if(!user){
            return Response.json({
                message:"Could not fetch User"
            },{
                status:400
            })
        }
        const verifyPassword = await bcrypt.compare(password,user?.password)

        if(!verifyPassword){
            return Response.json({
                message:"Password does not match"
            },{
                status:400
            })
        }
        const token = await new SignJWT({id:user.id})
        .setProtectedHeader({alg:"HS256"})
        .setExpirationTime("1w")
        .sign( new TextEncoder().encode(process.env.SECRET_KEY))

        return Response.json({ 
            token,
            message:"User Logged In Successfully"
        },{
            status:200
        })
    } catch (error) {
        return Response.json({
            message:"Error occured"
        },{
            status:400
        })
    }
}