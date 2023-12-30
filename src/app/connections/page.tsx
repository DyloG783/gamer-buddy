import { getFollowing, getUsersConnectionRequests, getUsersConnections } from "@/lib/query_helper";
import { IConnection } from "@/lib/custom_types";
import PaginatedConnections from "./components/PaginatedConnections";

const Connections = async () => {

    const userFollowing: IConnection[] = await getFollowing();
    const requests: IConnection[] = await getUsersConnectionRequests()
    const userConnections: IConnection[] = await getUsersConnections()

    return (
        <div className="flex flex-col">
            <div className=" bg-slate-200" id="connected_with_container">
                <p className="text-blue-600 font-semibold text-xl md:text-2xl
                    tracking-wider mt-4 md:mt-10 ml-4"
                >
                    Connected With
                </p>
                <PaginatedConnections connections={userConnections} itemsPerPage={5} />
            </div>
            <div className=" bg-slate-300" id="connection_request_container">
                <p className='text-blue-600 font-semibold text-xl md:text-2xl 
                tracking-wider mt-4 md:mt-10 ml-4'>
                    Connection requests
                </p>
                <PaginatedConnections connections={requests} itemsPerPage={5} />
            </div>
            <div className=" bg-slate-200" id="following_container">
                <p className="text-blue-600 font-semibold text-xl md:text-2xl
                 tracking-wider mt-4 md:mt-10 ml-4">
                    Following
                </p>
                <PaginatedConnections connections={userFollowing} itemsPerPage={5} />
            </div>

        </div>
    )
};

export default Connections;