import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getUsersConnectionInfo, getUsersConnectionRequests } from "@/lib/query_helper";
import Link from "next/link";

const Connections = async () => {

    const session = await getServerSession(authOptions);

    const userWithConnections = await getUsersConnectionInfo(session?.user?.email!);

    const requests = await getUsersConnectionRequests(session?.user?.email!)

    // returns "followedBy" relations when both users have connected with eachother (essentially accepted connections request)
    const connectons = userWithConnections?.followedBy.filter(by => (
        userWithConnections.following.some(fol => (by.followingId === fol.followedById))
    ))!

    return (
        <div className="w-full">

            Connected with
            <div>
                {connectons.map(c => (
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
                {userWithConnections?.followedBy.map(by => (
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