import prisma from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import TimezoneSelector from "./timezone/TimezoneSelector";
import AboutYouSelector from "./about_you/AboutYouSelector";
import UsernameSelector from "./username/UsernameSelector";

export default async function Profile() {

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        },
        include: {
            Profile: true
        }
    })

    return (
        <div className="grow flex justify-around my-1 md:my-10 
            text-sm md:text-base lg:text-lg">
            <div className="md:w-3/4 shadow-md p-4 md:p-10">
                <UsernameSelector userName={user?.name} />
                <AboutYouSelector bio={user?.Profile?.bio} />
                <TimezoneSelector userTimezone={user?.Profile?.timezone} />
            </div>
        </div>
    );
};
