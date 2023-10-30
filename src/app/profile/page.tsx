import AboutYou from "./AboutYou";
import Username from "./Username";
import prisma from '../lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";


export default async function Profile() {

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email as string;

    // using try catch so app doesn't crash if usr tries accessing proflie page through url when not signed in
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        })

        const userName: string | null | undefined = findUser?.name
        const userId: string | undefined = findUser?.id

        const findBio = await prisma.profile.findUnique({
            where: {
                userId: userId
            }
        })

        const bio: string | null | undefined = findBio?.bio

        return (
            <main className="flex justify-around text-sm md:text-base lg:text-lg">
                <div className="flex flex-col w-3/4 md:w-1/2">
                    <Username userName={userName} />
                    <AboutYou bio={bio} />
                    {/* <TimezoneSelector /> */}
                </div>
            </main>
        );
    } catch (error) {
        console.log("Profile page, Prisma error, user tired to access page through url while not logged in")
        console.log(error)
    }
};
