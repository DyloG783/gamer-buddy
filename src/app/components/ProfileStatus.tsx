import { getServerSession } from "next-auth"
import Image from "next/image"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import Link from "next/link"
import prisma from "@/lib/db"

export default async function ProfileStatus() {

    const session = await getServerSession(authOptions)

    if (session === null) {
        return (
            <div className="flex justify-around">
                <Link href={`/api/auth/signin`}
                    className="text-purple-800 underline"
                >Sign in to check profile status!</Link>
            </div>
        )
    }

    // find the user's id for the session
    const findUser = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    })

    // find the users profile based on their unique id
    const findProfile = await prisma.profile.findUnique({
        where: {
            userId: findUser?.id
        }
    })

    // get user's bio & timezone to pass into 'profileStatus' component which will check to see if they have been completed(are null or not)
    const aboutYou = findProfile?.bio
    const timezone = findProfile?.timezone

    if (aboutYou && timezone) {
        return (
            null
        )
    }

    return (
        <div id="profile_status_container"
            className="p-2 bg-red-300 border-2 border-black"
        >
            <h1 className="font-bold text-center">Your profile status</h1>
            {timezone
                &&
                <div
                    id="timezone_status_available"
                    className="flex gap-2 pb-2"
                >
                    <Image src="./checkmark-icon.svg"
                        height={0} width={0} alt="success timezone provided"
                        className={`w-4 md:w-7`}
                    />
                    <p>Completed timezone setting in your Profile!</p>
                </div>
                ||
                <div
                    id="timezone_status_unavailable"
                    className="flex gap-2 pb-2"
                >
                    <Image src="./red_cross.svg"
                        height={0} width={0} alt="fail timezone not provided"
                        className={`w-4 md:w-7`}
                    />
                    <p>You still need to add your timezone in your profile. Without this we can't show you how many others are available to game with!</p>
                </div>
            }
            {aboutYou
                &&
                <div
                    id="aboutYou_status_available"
                    className="flex gap-2 pb-2"
                >
                    <Image src="./checkmark-icon.svg"
                        height={0} width={0} alt="success timezone provided"
                        className={`w-4 md:w-7`}
                    />
                    <p>Completed aboutYou setting in your Profile!</p>
                </div>
                ||
                <div
                    id="aboutYou_status_unavailable"
                    className="flex gap-2 pb-2"
                >
                    <Image src="./red_cross.svg"
                        height={0} width={0} alt="fail aboutYou not provided"
                        className={`w-4 md:w-7`}
                    />
                    <p>You still need to add your AboutYou section in your profile. Without this players wont know your preferences or any helpful information. You idiot!!!</p>
                </div>
            }
        </div>
    )
}