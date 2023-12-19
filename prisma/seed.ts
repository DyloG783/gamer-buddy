// import prisma from "@/lib/db";
import { PrismaClient } from '@prisma/client'
import { test_users } from "./misc/test_users";

const prisma = new PrismaClient()

async function main() { 
    for (let user of test_users) { 
        await prisma.user.upsert({
            where: {email:  user.email},
            update: {},
            create: {
                email: user.email,
                name: user.name,
                games: {
                    connect: user.games?.map(g => ({id: g})) || [],
                },
                Profile: {
                    create: {
                        bio: user.bio,
                        timezone: user.timezone
                    }
                }
            }
        })
    }
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
