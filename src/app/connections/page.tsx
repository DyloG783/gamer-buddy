import { getFollowing, getUsersConnectionRequests, getUsersConnections } from "@/lib/query_helper";
import { IConnection } from "@/lib/custom_types";
import PaginatedConnections from "./components/PaginatedConnections";

const Connections = async () => {

    const userFollowing: IConnection[] = await getFollowing();
    const requests: IConnection[] = await getUsersConnectionRequests()
    const userConnections: IConnection[] = await getUsersConnections()

    return (
        <div id="page_container" className="flex flex-col justify-between h-full">
            <div className="grow bg-gradient-to-tr from-sky-50 to-emerald-50 flex flex-col justify-between" id="connected_with_container">
                <div>
                    <p className="text-blue-600 font-semibold text-xl md:text-2xl
                    tracking-wider mt-4 md:mt-10 ml-4"
                    >
                        Connected With
                    </p>
                    <p className="font-light tracking-wide ml-4">People who you follow and who follow you</p>
                </div>
                <PaginatedConnections connections={userConnections} itemsPerPage={5} option={"connected"} />
            </div>
            <div className="grow bg-gradient-to-bl from-blue-100 to-sky-50 flex flex-col justify-between" id="connection_request_container">
                <div>
                    <p className="text-blue-600 font-semibold text-xl md:text-2xl
                    tracking-wider mt-4 md:mt-10 ml-4"
                    >
                        Connection requests
                    </p>
                    <p className="font-light tracking-wide ml-4">People who follow you</p>
                </div>
                <PaginatedConnections connections={requests} itemsPerPage={5} option={"requests"} />
            </div>
            <div className="grow bg-gradient-to-tr from-violet-100 to-sky-50 flex flex-col justify-between" id="following_container">
                <div>
                    <p className="text-blue-600 font-semibold text-xl md:text-2xl
                    tracking-wider mt-4 md:mt-10 ml-4"
                    >
                        Following
                    </p>
                    <p className="font-light tracking-wide ml-4">People who you follow</p>
                </div>
                <PaginatedConnections connections={userFollowing} itemsPerPage={5} option={"following"} />
            </div>

        </div>
    )
};

export default Connections;