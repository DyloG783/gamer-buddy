import { Suspense } from "react";
import TimezoneMatches from "../components/TimezoneMatches";
import Loading from "./loading";
import GameConnections from "../components/GameConnections";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function GameLayout({ children, params, }: { children: React.ReactNode, params: { id: string } }) {

    // convert game id param from string to number to use in prisma query
    const gameId = Number(params.id);

    // pass sessoin to sub components
    const session = await getServerSession(authOptions);

    return (
        // <div className="grow flex flex-col justify-between ">
        <div className="grid gap-4 w-full mt-1 md:mt-4">
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
            <GameConnections gameId={gameId} />
            <TimezoneMatches gameId={gameId} session={session} />
        </div >
    )

}