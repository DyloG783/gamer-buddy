import { getFollowing, getUsersConnectionRequests, getUsersConnections } from "@/lib/query_helper";
import ConnectedWith from "./components/ConnectedWith";
import Following from "./components/Following";
import PendingConnectionRequests from "./components/PendingConnectionRequests";
import { IConnection } from "@/lib/custom_types";

const Connections = async () => {

    const userFollowing: IConnection[] = await getFollowing();
    const requests: IConnection[] = await getUsersConnectionRequests()
    const userConnections: IConnection[] = await getUsersConnections()

    return (
        <div className="w-full flex flex-col justify-evenly items-center">
            <ConnectedWith connections={userConnections} />
            <PendingConnectionRequests requests={requests} />
            <Following userFollowing={userFollowing} />
        </div>
    )
};

export default Connections;