import AboutYouSelector from "./about_you/AboutYouSelector";
import UsernameSelector from "./username/UsernameSelector";
import prisma from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import TimezoneSelector from "./timezone/TimezoneSelector";

export default async function Profile() {

    const session = await getServerSession(authOptions);

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
        <div className="grow flex justify-around
            text-sm md:text-base lg:text-lg">
            <div className=" w-1/2 md:w-3/4">
                <UsernameSelector userName={findUser?.name} />
                <AboutYouSelector bio={findProfile?.bio} />
                <TimezoneSelector userTimezone={findProfile?.timezone} />
            </div>
        </div>
    );

};
