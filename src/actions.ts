'use server'

import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache'



export async function SubmitBio(prevState: any, formData: FormData) {

    const input = formData.get("bioInputTextArea") as string;

    // const session = await getServerSession(authOptions);

    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: session?.user?.email as string
    //   }
    // })

    try {
        // await prisma.profile.upsert({
        //   where: {
        //     userId: user?.id as string,
        //   },
        //   update: {
        //     bio: input,
        //   },
        //   create: {
        //     userId: user?.id as string,
        //     bio: input,
        //   },
        // })

        revalidatePath('/');

        return { message: `Updated about you: ${input}` }

    } catch (error) {
        return { message: `Failed to update about you` }
    }

}

export async function SubmitTimezone(prevState: any, formData: FormData) {

    const input = formData.get("selectInput")

    // const session = await getServerSession(authOptions);

    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: session?.user?.email as string
    //   }
    // })

    try {
        // await prisma.profile.upsert({
        //   where: {
        //     userId: user?.id as string,
        //   },
        //   update: {
        //     timezone: input as string,
        //   },
        //   create: {
        //     userId: user?.id as string,
        //     timezone: input as string,
        //   },
        // })
        // revalidatePath('/');
        return { message: `Updated timezone: ${input}` }
    } catch (error) {
        return { message: `Failed to update timezone`, error }
    }
}

export async function sendMessagePrivate(playerId: string, formData: FormData) {
    const message = formData.get('message_input') as string;
    const { userId } = auth();

    if (!auth) {
        console.log("Send message server action, not authorised failure")
        return
    }

    try {
        await prisma.privateMessage.create({
            data: {
                sentById: userId!,
                recievedById: playerId,
                message: message
            }
        })
        revalidatePath('/');
        // return { message: `Created Message: ${message}!` }
        console.log("Created Message")
        return
    } catch (error) {
        // return { message: `Failed to create message`, error }
        console.log("Fail created Message", error)
    }
}

export async function sendMessageForum(forumId: number, formData: FormData) {
    const message = formData.get('message_input') as string;
    const { userId } = auth();

    if (!auth) {
        console.log("Send message server action, not authorised failure")
        return
    }

    try {
        await prisma.gameForumMessage.create({
            data: {
                userId: userId!,
                message: message,
                forumId: forumId
            }
        })
        revalidatePath('/');
        // return { message: `Created Message: ${message}!` }
        console.log("Created Message")
        return
    } catch (error) {
        // return { message: `Failed to create message`, error }
        console.log("Fail created Message", error)
    }
}