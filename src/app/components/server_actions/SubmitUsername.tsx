'use server'

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from 'next/cache'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// try updating session: https://next-auth.js.org/getting-started/client#updating-the-session

export default async function SubmitUsername(prevState: any, formData: FormData) {

  const prisma = new PrismaClient();
  const input = formData.get("usernameform") as string;

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email as string;

  await prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      name: input,
    },
  }).then(async () => {
    await prisma.$disconnect();
  })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });


  revalidatePath('/');
}
