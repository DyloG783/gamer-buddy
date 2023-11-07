import AboutYou from "./about_you/AboutYou";
import Username from "./username/Username";
import prisma from '@/app/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Timezone from "./timezone/Timezone";

export default async function Profile() {

    const session = await getServerSession(authOptions);

    // using try catch so app doesn't crash if usr tries accessing proflie page through url when not signed in
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email as string
            }
        })

        const findProfile = await prisma.profile.findUnique({
            where: {
                userId: findUser?.id
            }
        })

        return (
            <main className="flex justify-around text-sm md:text-base lg:text-lg">
                <div className="flex flex-col w-3/4 md:w-1/2">
                    <Username userName={findUser?.name} />
                    <AboutYou bio={findProfile?.bio} />
                    <Timezone userTimezone={findProfile?.timezone} />
                </div>
            </main>
        );
    } catch (error) {
        console.log("Profile page, Prisma error, user tired to access page through url while not logged in")
        console.log(error)
    }
};
