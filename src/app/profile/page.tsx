import AboutYou from "@/app/components/profile/AboutYou";
import Username from "@/app/components/profile/Username";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";


export default async function Profile() {

    const prisma = new PrismaClient();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email as string;

    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })
    const userName: string = user?.name!

    return (
        <main className="flex justify-around text-sm md:text-base lg:text-lg">
            <div className="flex flex-col w-3/4 md:w-1/2">
                <Username userName={userName} />
                <AboutYou />
            </div>
        </main>
    );
};
