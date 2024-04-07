import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import z, { UnsafeMetadataSchema } from '@/lib/zod_schemas';


export default async function ProfileStatus() {

    const { userId } = auth();
    const user = await currentUser();

    // user is not logged in don't display this component
    if (!userId) return null;

    // extract custom user profile info out of Clerk
    const bio: z.infer<typeof UnsafeMetadataSchema>["bio"] = user?.unsafeMetadata.bio as string
    const timezone: z.infer<typeof UnsafeMetadataSchema>["timezone"] = user?.unsafeMetadata.timezone as string

    // This works for hiding the component completely if the user has completed setting their timezone, and about-you profile info
    if (bio && timezone) return null;

    return (
        <div id="profile_status_container " className="banner">
            {/* <button>Dismiss</button> */}
            <Link href={`/user-profile/game-settings`} className="tracking-wide">
                <h1 className="font-semibold text-center mb-4 secondary-color-font tracking-wide text-xl">Update your profile</h1>
                {!timezone &&
                    <>
                        <div
                            id="timezone_status_unavailable"
                            className="py-2 max-w-3xl mx-auto"
                        >
                            <p className="flex justify-around">Add your timezone in your profile. Without this we cannot show you how many others are available to game with near you!</p>
                        </div>
                        {!bio && <hr />}
                    </>
                }
                {!bio &&
                    <>
                        <div
                            id="aboutYou_status_unavailable"
                            className="py-2 max-w-3xl mx-auto"
                        >
                            <p className="flex justify-around">Share someting about youself in the About You section in your profile so others can feel your vibes!</p>
                        </div>
                        {!timezone && <hr />}
                    </>
                }
            </Link >
        </div>
    )
}