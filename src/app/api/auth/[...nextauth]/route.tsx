import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import Twitter from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prismaClient";



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) ,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    }),

    DiscordProvider({
      clientId: process.env.DISCORD_ID ?? "",
      clientSecret: process.env.DISCORD_SECRET ?? "",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret:process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
    
  ],

  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        id: user.id ,
        ...session.user ,
      },
    }),
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }




