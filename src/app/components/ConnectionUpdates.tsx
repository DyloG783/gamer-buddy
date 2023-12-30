import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { getUsersConnectionRequests } from "@/lib/query_helper";

export default async function ConnectionUpdates() {

    const { userId } = auth();

    // user is not logged in don't display this component
    if (!userId) {
        return (
            <div id="no_session_container">
                <Link href={`/api/auth/signin`}
                    className="text-purple-800 underline italic flex justify-around"
                >Sign in to see Messages, Connection requests, and more!</Link>
            </div>
        )
    }

    const requests = await getUsersConnectionRequests()

    return (
        <div id="connection_updates_container" className="flex flex-col md:flex-row gap-8 md:gap-0 justify-around h-full md:mt-20 ">
            <div
                id="connection_messages_container"
                className=""
            >
                <h2 className="font-semibold text-blue-800 text-xl mb-4 md:mb-10 tracking-wide">Messages</h2>
                <p className="p-4">
                    No new messages
                </p>
            </div>
            <div
                id="connection_requests_container"
                className=" "
            >
                <h2 className="font-semibold text-blue-800 text-xl mb-4 md:mb-10 tracking-wide">Connection requests</h2>
                <>
                    {requests!.length > 0
                        &&
                        <Link href={`/connections`} className="">
                            <div className="flex p-4 hover:shadow-sm hover:cursor-pointer">
                                <span className="">Pending connection requests: {requests!.length}</span>
                                <span className="animate-ping ml-4">
                                    <img src="/./bells.svg" height={0} width={0} alt="chat_icon"
                                        className="w-2 md:w-3 h-auto bg-yellow-200 rounded-xl"
                                    />
                                </span>
                            </div>

                            {/* <p>Click here to checkout the Connections page where you can manage your player interactions!</p> */}

                        </Link>
                        ||
                        <p className="p-4">You have no connection requests</p>
                    }
                </>
            </div>
        </div>
    )
}