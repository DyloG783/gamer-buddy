'use server'

import prisma from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache'
import z, { StringSchema, NumberSchema, UserSchema } from './zod_schemas';


export async function sendMessagePrivate(bindData: {
    privateRoomId: string,
    playerId: string
}, formData: FormData) {
    'use server'

    const input = StringSchema.safeParse(formData.get('message_input') as string);
    if (!input.success) return console.log("Input validation failed (zod)");

    const { userId } = auth();
    if (!userId) return console.log("Send message server action, not authorised failure");

    const Pusher = require("pusher");

    try {
        const privMessage = await prisma.privateMessage.create({
            data: {
                chatPrivateRoomId: bindData.privateRoomId,
                message: input.data,
                senderId: userId!,
                receiverId: bindData.playerId
            },
            select: {
                message: true,
                sentPrivateBy: { select: { userName: true } }
            }
        })

        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: "ap1",
            useTLS: true,
        });

        await pusher.trigger(bindData.privateRoomId, "private-room-post", {
            message: `${JSON.stringify(privMessage)}\n\n`,
        });

    } catch (error) {
        console.log("Fail create and broadcast private message", error)
    }
}

export async function sendMessageForum(gameRoomId: string, formData: FormData) {
    'use server'

    const input = StringSchema.safeParse(formData.get('message_input') as string);
    if (!input.success) return console.log("Input validation failed (zod)");

    const { userId } = auth();
    if (!userId) return console.log("Send message server action, not authorised failure");

    const Pusher = require("pusher");

    try {
        const newMessage = await prisma.gameMessage.create({
            data: {
                userId: userId,
                message: input.data,
                gameRoomId: gameRoomId,

            },
            include: {
                sentGameBy: {
                    select: {
                        userName: true
                    }
                }
            }
        })

        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: "ap1",
            useTLS: true,
        });

        await pusher.trigger(gameRoomId, "game-room-post", {
            message: `${JSON.stringify(newMessage)}\n\n`,
        });

    } catch (error) {
        console.log("Fail create Message", error)
    }
}

export async function addGame(gameId: number) {
    'use server'

    const { userId } = auth();
    if (!userId) return console.log("Send message server action, not authorised failure");

    const input = NumberSchema.safeParse(gameId);
    if (!input.success) return console.log("Input validation failed (zod)");

    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                games: {
                    connect: {
                        id: input.data
                    }
                }
            }
        })
        revalidatePath(`/game/${gameId}`)
    } catch (error) {
        console.log("Failed to add game - server action", error)
    }
}

export async function removeGame(gameId: number) {
    'use server'

    const { userId } = auth();
    if (!userId) return console.log("Send message server action, not authorised failure");

    const input = NumberSchema.safeParse(gameId);
    if (!input.success) return console.log("Input validation failed (zod)");

    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                games: {
                    disconnect: {
                        id: input.data
                    }
                }
            }
        })
        revalidatePath(`/game/${gameId}`)
    } catch (error) {
        console.log("Failed to remove game - server action", error)
    }

}

export async function followUser(player: z.infer<typeof UserSchema>) {

    const { userId } = auth();
    if (!userId) return console.log("Send message server action, not authorised failure");

    const input = UserSchema.safeParse(player);
    if (!input.success) return console.log(`Input validation failed (zod"), `, input.error.errors);

    const user = await currentUser();

    try {
        await prisma.follows.create({
            data: {
                followedById: user?.id!,
                followedByEmail: user?.emailAddresses[0].emailAddress!,
                followedByUName: user?.username!,
                followingId: input.data.id,
                followingEmail: input.data.email!,
                followingUName: input.data.userName!
            }
        })
        revalidatePath(`/view-player/${input.data.id}`)
    } catch (error) {
        console.log("Failed to create following relation - server action", error)
    }
}

export async function unFollowUser(player: z.infer<typeof UserSchema>) {

    const { userId } = auth();
    if (!userId) return console.log("Send message server action, not authorised failure");

    const input = UserSchema.safeParse(player);
    if (!input.success) return console.log("Input validation failed (zod)", input.error.errors);

    const user = await currentUser();

    try {
        await prisma.follows.delete({
            where: {
                followingEmail_followedByEmail: {
                    followedByEmail: user?.emailAddresses[0].emailAddress!,
                    followingEmail: input.data.email!,
                }
            }
        })
        revalidatePath(`/view-player/${input.data.id}`)
    } catch (error) {
        console.log("Failed to remove following relation - server action", error)
    }
}