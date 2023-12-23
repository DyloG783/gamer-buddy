import prisma from '@/lib/db';
import { test_users } from '../../prisma/test_users';


// real users must login first to connect fake users with
async function game_to_user_relations() {

    // set main user (me) games
    try {
        const user = await prisma.user.findFirstOrThrow({ where: { email: "dylan.m.c.digby@gmail.com" } })
        await prisma.user.update({
            where: { id: user.id },
            data: {
                games: {
                    connect: [
                        { id: 250630 },
                        { id: 83563 },
                        { id: 211573 },
                        { id: 279624 },
                        { id: 270049 },
                        { id: 81753 },
                        { id: 229 },
                        { id: 262659 },
                        { id: 247567 },
                    ]
                }
            }
        })
        console.log("Success relating User to games!")
    } catch (error) {
        console.log("Something went wrong relating User to games:", error)
    }

    // set test users games
    try {
        for (const tUser of test_users) {
            const user = await prisma.user.findFirstOrThrow({ where: { email: tUser.email } })
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    games: {
                        connect: tUser.games?.map(g => ({ id: g })) || [],
                    }
                }
            })
        }

        console.log("Success relating test users to games!")
    } catch (error) {
        console.log("Something went wrong relating test users to games:", error)
    }
}

game_to_user_relations()