import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { getUnseenMessages, getUsersConnectionRequests } from "@/lib/query_helper";
import Image from 'next/image';

// stop page from caching (needed for real time chat (in prod))
export const dynamic = "force-dynamic";

export default async function ConnectionUpdates() {

    const { userId } = auth();

    // user is not logged in don't display this component
    if (!userId) {
        return (
            <div id="no_session_container" className="flex h-full">
                <Link href={`${process.env.CLERK_SIGNIN}`}
                    className="text-purple-800 font-semibold tracking-wider italic m-auto
                    p-10 hover:underline"
                >
                    Sign in to see Messages, Connection requests, and more!</Link>
            </div>
        )
    }

    const requests = await getUsersConnectionRequests();
    const unseenMessages = await getUnseenMessages();

    return (
        <div id="connection_updates_container" className="flex flex-col md:flex-row gap-8 md:gap-0 justify-around h-full md:pt-20 ">
            <div
                id="connection_messages_container"

            >
                <h2 className="font-semibold text-blue-800 text-xl mb-4 md:mb-10 tracking-wide">Messages</h2>
                {unseenMessages && unseenMessages.length > 0 &&
                    <Link href={`/connections`} >
                        <div className="flex p-4  hover:cursor-pointer">
                            <span >New messages: <span className="text-emerald-600 font-semibold">{unseenMessages.length}</span></span>
                            <span className="animate-ping ml-4">
                                <Image src="/./bells.svg" height={0} width={0} alt="chat_icon"
                                    className="w-2 md:w-3 h-auto bg-yellow-200 rounded-xl"
                                />
                            </span>
                        </div>
                    </Link>
                    ||
                    <p className="p-4">You have no new messages</p>
                }
            </div>
            <div
                id="connection_requests_container"
                className=" "
            >
                <h2 className="font-semibold text-blue-800 text-xl mb-4 md:mb-10 tracking-wide">Connection requests</h2>
                {requests && requests.length > 0 &&
                    <Link href={`/connections`} >
                        <div className="flex p-4 hover:cursor-pointer">
                            <span >Pending connection requests: <span className="text-emerald-600 font-semibold">{requests.length}</span></span>
                            <span className="animate-ping ml-4">
                                <Image src="/./bells.svg" height={0} width={0} alt="chat_icon"
                                    className="w-2 md:w-3 h-auto bg-yellow-200 rounded-xl"
                                />
                            </span>
                        </div>
                    </Link>
                    ||
                    <p className="p-4">You have no connection requests</p>
                }
            </div>
        </div>
    )
}