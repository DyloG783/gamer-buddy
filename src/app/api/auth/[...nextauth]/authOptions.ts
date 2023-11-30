import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from "@/lib/db";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import TwitchProvider from "next-auth/providers/twitch";
// import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {

    session: { strategy: "jwt", },

    adapter: PrismaAdapter(prisma),
    
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID as string,
            clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        //  CredentialsProvider({
        //     // The name to display on the sign in form (e.g. 'Sign in with...')
        //     name: 'Credentials',
        //     // The credentials is used to generate a suitable form on the sign in page.
        //     // You can specify whatever fields you are expecting to be submitted.
        //     // e.g. domain, username, password, 2FA token, etc.
        //     // You can pass any HTML attribute to the <input> tag through the object.
        //     credentials: {
        //     email: { label: "Email", type: "text", placeholder: "your email" },
        //     password: { label: "Password", type: "password" }
        //     },
        //     async authorize(credentials, req) {
        //     // You need to provide your own logic here that takes the credentials
        //     // submitted and returns either a object representing a user or value
        //     // that is false/null if the credentials are invalid.
        //     // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        //     // You can also use the `req` object to obtain additional parameters
        //     // (i.e., the request IP address)
        //     const res = await fetch("http://localhost:3000/api/credentials", {
        //         method: 'POST',
        //         body: JSON.stringify(credentials),
        //         headers: { "Content-Type": "application/json" }
        //     })
        //     const user = await res.json()

        //     // If no error and we have user data, return it
        //     if (res.ok && user) {
        //         return user
        //     }
        //     // Return null if user data could not be retrieved
        //     return null
        //     }
        // }),
    ],
    // callbacks: {
    //     async session({ session }) { 
    //         return session
    //     }
    // }
}