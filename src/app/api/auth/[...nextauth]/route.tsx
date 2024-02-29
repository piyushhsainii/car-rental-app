import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import Twitter from "next-auth/providers/twitter";
import Google from "next-auth/providers/google";
import Manual from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


const prisma = new PrismaClient()

export const handler =  NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        GitHubProvider({
            clientId:process.env.GITHUB_ID ?? "",
            clientSecret:process.env.GITHUB_SECRET ?? ""
        }),
        DiscordProvider({
            clientId:process.env.DISCORD_ID ?? "",
            clientSecret:process.env.DISCORD_SECRET ?? "",
        }),
       
        // Manual({
        //     name:"Sign In",
        //     credentials:{
        //         email:{
        //             label:"Email",
        //             type:"email",
        //             placeholder:"example@gmail.com"
        //         },
        //         password:{ label:"password",type:"password"}
        //     },
        //     async authorize(credentials){
        //         if(!credentials || !credentials.email || !credentials.password )
        //     }
        // })
     ],
    // callbacks: {
    //     session: ({ session, token }) => {
    //       return {
    //         ...session,
    //         user: {
    //           ...session.user,
    //           id: token.id,
    //           randomKey: token.randomKey,
    //         },
    //       };
    //     }
    // }
    secret:process.env.NEXTAUTH_URL
})

export { handler as GET , handler as POST }