import { getServerSession } from "next-auth"
import Image from "next/image"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import Link from "next/link"
import prisma from "@/lib/db"

export default async function ProfileStatus() {

    const session = await getServerSession(authOptions)

    // user is not logged in don't display this component
    if (!session) {
        return (
            null
        )
    }

    // find the user's email from the  the session
    const userProfile = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        },
        select: {
            Profile: true
        }
    })

    // This works for hiding the component completely if the user has completed setting their timezone, and about-you section
    if (userProfile?.Profile?.bio && userProfile?.Profile?.timezone) {
        return (
            null
        )
    }

    return (
        <div id="profile_status_container "
            className="p-4 md:p-8 mx-auto bg-yellow-100 shadow-lg"
        >
            <Link href={`/profile`}>
                <h1 className="font-semibold text-center mb-4 text-blue-700">Your profile status</h1>
                {userProfile?.Profile?.timezone
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
                        <p>* You still need to add your timezone in your profile. Without this we can't show you how many others are available to game with</p>
                    </div>
                }
                {userProfile?.Profile?.timezone
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
                        <p>* You still need to add your AboutYou section in your profile. Without this players wont know your preferences or any helpful information</p>
                    </div>
                }
            </Link>
        </div>
    )
}