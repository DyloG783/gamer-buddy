import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { getUsersConnectionRequests } from "@/lib/query_helper";

export default async function ConnectionMessages() {

    const { userId } = auth();
    // const user = await currentUser();

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
        <div
            id="connectoin_messages_container"
            className="p-4 shadow-md bg-slate-300"
        >
            <div
                id="connection_messages_container"
                className=" flex flex-col items-center"
            >
                <h2 className="font-semibold text-blue-700 text-xl mb-4">Your connection messages</h2>
                <div className="max-w-4xl">
                    You don't yet have any messages, or connection requests. Checkout some Games and connect with others who want to play!
                </div>
            </div>
            <div
                id="connection_messages_container"
                className=" flex flex-col items-center"
            >
                <h2 className="font-semibold text-blue-700 text-xl mb-4">Your connection requests</h2>
                <div className="max-w-4xl">
                    {requests!.length > 0
                        &&
                        <Link href={`/connections`} className="text-purple-700 hover:italic">
                            <p>Pending connection requests: {requests!.length}</p>
                            <p>Click here to checkout the Connections page where you can manage your player interactions!</p>

                        </Link>
                        ||
                        <p>You have no connection requests</p>
                    }
                </div>
            </div>
        </div>
    )
}