'use server'

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from 'next/cache'

export default async function SubmitUsername(prevState: any, formData: FormData) {

  const prisma = new PrismaClient();

  const input = formData.get("usernameform")

  await prisma.user.update({
    where: {
      email: "dylantest679@gmail.com",
    },
    data: {
      name: input as string,
    },
  }).then(async () => {
    await prisma.$disconnect();
  })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  revalidatePath('/')
}
