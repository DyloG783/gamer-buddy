'use server'

import prisma from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache'

export async function sendMessagePrivate(privateRoomId: string, formData: FormData) {
    'use server'

    const message = formData.get('message_input') as string;
    const { userId } = auth();
    const Pusher = require("pusher");

    if (!auth) {
        console.log("Send message server action, not authorised failure")
        return
    }

    try {
        const privMessage = await prisma.privateMessage.create({
            data: {
                chatPrivateRoomId: privateRoomId,
                message: message,
                userId: userId!
            },
            select: {
                message: true,
                sentPrivateBy: { select: { userName: true } }
            }
        })
        // revalidatePath('/');
        console.log("Created private message in Database!")

        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: "ap1",
            useTLS: true,
        });

        pusher.trigger(privateRoomId, "private-room-post", {
            message: `${JSON.stringify(privMessage)}\n\n`,
        });

    } catch (error) {
        // return { message: `Failed to create message`, error }
        console.log("Fail create and broadcast private message", error)
    }
}

export async function sendMessageForum(gameRoomId: string, formData: FormData) {
    'use server'

    const message = formData.get('message_input') as string;
    const { userId } = auth();
    const Pusher = require("pusher");

    if (!auth) {
        console.log("Send message server action, not authorised failure")
        return
    }

    try {
        const newMessage = await prisma.gameMessage.create({
            data: {
                userId: userId!,
                message: message,
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
        // revalidatePath('/');
        console.log("Created Message!")

        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: "ap1",
            useTLS: true,
        });

        pusher.trigger(gameRoomId, "game-room-post", {
            message: `${JSON.stringify(newMessage)}\n\n`,
        });

    } catch (error) {
        // return { message: `Failed to create message`, error }
        console.log("Fail create Message", error)
    }
}

export async function addGame(gameId: number, formData: FormData) {
    'use server'

    const { userId } = auth();

    try {
        await prisma.user.update({
            where: {
                id: userId!
            },
            data: {
                games: {
                    connect: {
                        id: gameId
                    }
                }
            }
        })

        revalidatePath(`/game/${gameId}`)
    } catch (error) {
        console.log("Failed to add game - server action", error)
    }
}

export async function removeGame(gameId: number, formData: FormData) {
    'use server'

    const { userId } = auth();

    try {
        await prisma.user.update({
            where: {
                id: userId!
            },
            data: {
                games: {
                    disconnect: {
                        id: gameId
                    }
                }
            }
        })

        revalidatePath(`/game/${gameId}`)
    } catch (error) {
        console.log("Failed to remove game - server action", error)
    }

}

export async function addUser(player: any, formData: FormData) {
    const user = await currentUser();

    try {
        await prisma.follows.create({
            data: {
                followedById: user?.id!,
                followedByEmail: user?.emailAddresses[0].emailAddress!,
                followedByUName: user?.username!,
                followingId: player.id,
                followingEmail: player.email!,
                followingUName: player.userName!
            }
        })
        console.log("Success to create following relation - server action")
        revalidatePath(`/view-player/${player.id}`)
    } catch (error) {
        console.log("Failed to create following relation - server action", error)
    }
}

export async function removeUser(player: any, formData: FormData) {
    const user = await currentUser();

    try {
        await prisma.follows.delete({
            where: {
                followingEmail_followedByEmail: {
                    followedByEmail: user?.emailAddresses[0].emailAddress!,
                    followingEmail: player.email!,
                }
            }
        })
        console.log("Success to remove following relation - server action")
        revalidatePath(`/view-player/${player.id}`)
    } catch (error) {
        console.log("Failed to remove following relation - server action", error)
    }
}