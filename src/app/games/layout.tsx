import React, { Suspense } from "react";
import Loading from "@/lib/loading";
import YourGames from "./components/YourGames";

export default function GamesLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col h-full gap-10" id="layout_games">
            <div className="shadow-sm">
                <YourGames />
            </div>
            <Suspense fallback={<Loading />}>
                <div id="games_layout_children_container" className="grow flex mx-auto"
                >
                    {children}
                    {/* <Loading /> */}
                </div>
            </Suspense>
        </div >
    )
}
