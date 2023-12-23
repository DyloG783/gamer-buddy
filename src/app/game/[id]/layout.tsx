import { Suspense } from "react";
import TimezoneMatches from "../components/TimezoneMatches";
import Loading from "./loading";
import GameConnections from "../components/GameConnections";

export default async function GameLayout({ children, params, }: { children: React.ReactNode, params: { id: string } }) {

    // convert game id param from string to number to use in prisma query
    const gameId = Number(params.id);

    return (
        // <div className="grow flex flex-col justify-between ">
        <div className="grid gap-4 w-full mt-1 md:mt-4">
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
            <GameConnections gameId={gameId} />
            <TimezoneMatches gameId={gameId} />
        </div >
    )

}