import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import Link from "next/link"

export default async function ConnectionMessages() {

    const session = await getServerSession(authOptions)

    return (
        <div
            id="connectoin_messages_container"
            className="flex justify-around p-4"
        >
            {session?.user
                &&
                <div> Your connection messages: ...</div>
                ||
                <div>
                    <Link href={`/api/auth/signin`}
                        className="text-purple-800 underline"
                    >Sign in to see your messages</Link>
                </div>
            }
        </div>
    )
}