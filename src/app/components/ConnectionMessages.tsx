import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import Link from "next/link"

export default async function ConnectionMessages() {

    const session = await getServerSession(authOptions)

    return (
        <div
            id="connectoin_messages_container"
            className="p-4 shadow-md bg-slate-300"
        >
            {session?.user
                &&
                <div
                    id="connection_messages_container"
                    className=" flex flex-col items-center"
                >
                    <h2 className="font-semibold text-blue-700 text-xl mb-4">Your connection messages</h2>
                    <div className="max-w-4xl">
                        You don't yet have any messages, or connection requests. Checkout some Games and connect with others who want to play!
                    </div>
                </div>
                ||
                <div>
                    <Link href={`/api/auth/signin`}
                        className="text-purple-800 underline italic"
                    >Sign in to see Messages, Connection requests, and more!</Link>
                </div>
            }
        </div>
    )
}