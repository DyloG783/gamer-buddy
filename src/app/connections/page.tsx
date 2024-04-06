import { getFollowing, getUnseenMessages, getUsersConnectionRequests, getUsersConnections } from "@/lib/query_helper";
import z, { MessageSchema, ConnectionWithTimezone } from '@/lib/zod_schemas';

import PaginatedConnections from "./components/PaginatedConnections";
import { Suspense } from "react";
import Loading from "@/lib/loading";

// 30 seconds auto update for all clients (after navigation?)
export const dynamic = 'force-dynamic';

const Connections = async () => {

    const userFollowing: z.infer<typeof ConnectionWithTimezone>[] | null = await getFollowing();
    const requests: z.infer<typeof ConnectionWithTimezone>[] | null = await getUsersConnectionRequests();
    const userConnections: z.infer<typeof ConnectionWithTimezone>[] | null = await getUsersConnections();
    const unseenMessages: z.infer<typeof MessageSchema>[] | null = await getUnseenMessages();

    return (
        <div id="page_container" className="flex flex-col full-height-minus-nav background-color dark:bg-black">
            <div id="connected_with_container"
                className="grow flex flex-col justify-between pl-4 md:pl-10 shadow-sm
                ">
                <div>
                    <p className="blue-font font-semibold text-xl md:text-2xl
                    tracking-wider mt-4 pb-2"
                    >
                        Connected With
                    </p>
                    <p className="font-light tracking-wide ml-4 mb-4 md:mb-0">Connections you can chat with</p>
                </div>
                <Suspense fallback={<Loading />}>
                    <PaginatedConnections connections={userConnections} itemsPerPage={5} option={"connected"} unseenMessages={unseenMessages} />
                    {/* <Loading /> */}
                </Suspense>
            </div>
            <div id="connection_request_container" className="grow flex flex-col justify-between pl-4 md:pl-10 shadow-sm" >
                <div>
                    <p className="blue-font font-semibold text-xl md:text-2xl
                    tracking-wider mt-4 pb-2"
                    >
                        Connection requests
                    </p>
                    <p className="font-light tracking-wide ml-4 mb-4 md:mb-0">People who follow you. Follow them back to connect with them!</p>
                </div>
                <Suspense fallback={<Loading />}>
                    <PaginatedConnections connections={requests} itemsPerPage={5} option={"requested"} />
                    {/* <Loading /> */}
                </Suspense>
            </div>
            <div id="following_container" className="grow flex flex-col justify-between pl-4 md:pl-10 shadow-sm">
                <div>
                    <p className="blue-font font-semibold text-xl md:text-2xl
                    tracking-wider mt-4 pb-2"
                    >
                        Following
                    </p>
                    <p className="font-light tracking-wide ml-4 mb-4 md:mb-0">People who you follow. They will be notified that you wish to connect with them</p>
                </div>
                <Suspense fallback={<Loading />}>
                    <PaginatedConnections connections={userFollowing} itemsPerPage={5} option={"following"} />
                    {/* <Loading /> */}
                </Suspense>
            </div>

        </div>
    )
};

export default Connections;