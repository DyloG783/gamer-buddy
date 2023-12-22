'use server'

import prisma from '@/lib/db'
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

export default async function SubmitTimezone(prevState: any, formData: FormData) {

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