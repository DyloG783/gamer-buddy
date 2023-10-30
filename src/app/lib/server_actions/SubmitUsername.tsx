'use server'

import prisma from '../db'
import { revalidatePath } from 'next/cache'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function SubmitUsername(prevState: any, formData: FormData) {

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
