'use server'

import prisma from '../db'
import { revalidatePath } from 'next/cache'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function SubmitBio(prevState: any, formData: FormData) {

  const input = formData.get("bioinputform") as string;

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email as string;

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail
    }
  })
  const userId: string | undefined = user?.id as string


  await prisma.profile.upsert({
    where: {
      userId: userId,
    },
    update: {
      bio: input,
    },
    create: {
      userId: userId,
      bio: input,
    },
  })
  // .then(async () => {
  //   await prisma.$disconnect();
  // }).catch(async (e) => {
  //   console.error(e);
  //   await prisma.$disconnect();
  //   process.exit(1);
  // });


  revalidatePath('/');
}
