import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getUsersFollowingInfo, getUsersConnectionRequests, getUsersConnections } from "@/lib/query_helper";
import Link from "next/link";

const Connections = async () => {

    const session = await getServerSession(authOptions);
    const userFollowingInfo = await getUsersFollowingInfo(session?.user?.email!);
    const requests = await getUsersConnectionRequests(session?.user?.email!)
    const connections = await getUsersConnections(session?.user?.email!)

    return (
        <div className="w-full">

            Connected with
            <div>
                {connections.map(c => (
                    <Link href={`/connections/${c.gameId}/${c.followingId}/${c.followedById}`}
                        key={c.followingId}
                        className="text-purple-700 hover:italic"
                    >
                        <p >{`${c.followingId} - ${c.gameId}; `}</p>
                    </Link>
                ))}
            </div>

            Connection requests
            <ul>
                {requests!.map(req => (
                    <li key={`${req.followingId}`}>
                        <Link href={`/connect/${req.gameId}/${req.followedById}`}
                            className="text-purple-700 hover:italic"
                        >
                            ID: {req.followedById}, Game: {req.gameId}
                        </Link>
                    </li>
                ))}
            </ul>

            Following
            <ul>
                {userFollowingInfo?.followedBy.map(by => (
                    <Link href={`/connect/${by.gameId}/${by.followingId}`}
                        key={by.followingId}
                        className="text-purple-700 hover:italic"
                    >
                        <p >{by.followingId}, Game: {by.gameId}</p>
                    </Link>
                ))}
            </ul>
        </div>
    )
};

export default Connections;