import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getFollowing, getUsersConnectionRequests, getUsersConnections } from "@/lib/query_helper";
import ConnectedWith from "./components/ConnectedWith";
import Following from "./components/Following";
import PendingConnectionRequests from "./components/PendingConnectionRequests";

const Connections = async () => {

    const session = await getServerSession(authOptions);
    const userFollowing = await getFollowing(session?.user?.email!);
    const requests = await getUsersConnectionRequests(session?.user?.email!)
    const userConnections = await getUsersConnections(session?.user?.email!)

    return (
        <div className="w-full flex flex-col justify-evenly items-center">
            <ConnectedWith connections={userConnections} />
            <PendingConnectionRequests requests={requests} />
            <Following userFollowing={userFollowing} />
        </div>
    )
};

export default Connections;