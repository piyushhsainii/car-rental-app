import { SignJWT } from 'jose'
import { prisma } from '../../../lib/prismaClient'
import bcrypt  from 'bcrypt'

export async function POST(req:Request){
    const  { name, email, password } = await req.json()
   try {
    const userExist = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if(userExist){
        return Response.json({
            message:"User already exist with this Email"
        },{
            status:400
        })
    }
    const HashedPassword = await bcrypt.hash(password,10)
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:HashedPassword
        }
    })
    const token = await new SignJWT({id:user.id})
    .setProtectedHeader({alg:"HS256"})
    .setExpirationTime('1w')
    .sign(new TextEncoder().encode(process.env.SECRET_KEY))
    
    return Response.json({
        token,
        message:"User created Successfully"
    },{
        status:200
    })
   } catch (error) {
        console.log(error)
        return Response.json({
            messsage:"Error creating user"
        },{
            status:400
        })
   }
}