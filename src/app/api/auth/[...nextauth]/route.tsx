import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import Twitter from "next-auth/providers/twitter";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismaClient";



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID ?? "",
      clientSecret: process.env.DISCORD_SECRET ?? "",
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     name: {
    //       label: "Username",
    //       type: "text",
    //       placeholder: "Enter username"
    //     },
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "example@gmail.com"
    //     },
    //     password: { label: "password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //     const user = await prisma.user.create({
    //       data:{
    //         name:credentials?.name,
    //         email:credentials?.email,
    //         password:credentials?.password,
    //       }
    //     })
    //     if (user) {
    //       return user
    //     } else {
    //       return null
    //     }
    //   }
    // })
  ],
  callbacks: {
    session: ({ session, user }) => ({
      user: {
        ...session.user,
        id: user.id,
      },
      ...session,
    }),
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }




