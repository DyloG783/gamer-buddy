import { auth, currentUser } from "@clerk/nextjs";
import { TUnsafeMetadata } from "@/lib/custom_types";
import Image from "next/image";
import Link from "next/link";

export default async function ProfileStatus() {

    const { userId } = auth();
    const user = await currentUser();

    // user is not logged in don't display this component
    if (!userId) {
        return (
            null
        )
    }

    // extract custom user profile info out of Clerk
    const bio: TUnsafeMetadata["bio"] = user?.unsafeMetadata.bio as string
    const timezone: TUnsafeMetadata["timezone"] = user?.unsafeMetadata.timezone as string

    // This works for hiding the component completely if the user has completed setting their timezone, and about-you profile info
    if (bio && timezone) {
        return (
            null
        )
    }

    return (
        <div id="profile_status_container "
            className="p-4 md:p-8 animate-pulse bg-yellow-50"
        >
            <Link href={`/user-profile/game-settings`}>
                <h1 className="font-semibold text-center mb-4 text-blue-700 tracking-wide">Update your profile</h1>
                {!timezone &&
                    <div
                        id="timezone_status_unavailable"
                        className="flex justify-around gap-2 pb-2"
                    >
                        <p className="text-sm italic">You still need to add your timezone in your profile. Without this we cannot show you how many others are available to game with</p>
                    </div>
                }
                {!bio &&
                    <div
                        id="aboutYou_status_unavailable"
                        className="flex justify-around gap-2 pb-2"
                    >
                        <p className="text-sm italic">You need to add your AboutYou section in your profile. Without this players wont know your preferences or any helpful information</p>
                    </div>
                }
            </Link >
        </div >
    )
}