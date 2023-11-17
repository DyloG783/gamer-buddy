'use server'

import prisma from '../../../lib/db'
import { revalidatePath } from 'next/cache'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function SubmitUsername(prevState: any, formData: FormData) {

  const input = formData.get("usernameInput") as string;

  const session = await getServerSession(authOptions);

  try {
    await prisma.user.update({
      where: {
        email: session?.user?.email as string,
      },
      data: {
        name: input,
      },
    })

    revalidatePath('/');
    return { message: `Updated username: ${input}` }
  } catch (error) {
    return { message: `Failed to update username` }
  }
}
