import { NextResponse } from "next/server";
import prisma from "@/lib/db";

type credentialsData = {email: string, password: string}

export async function POST(request: Request) { 

    const { email, password }: credentialsData = await request.json()
    
    let user = null;

    async function main() { 
        const usr = await prisma.user.findUnique({
            where: {email: email}
        })

        // if (usr?.password === password) { 
        //     user = usr
        // }
    }

    main()
    .then(async () => {
    await prisma.$disconnect()
    })
    .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

    return NextResponse.json({user})
}