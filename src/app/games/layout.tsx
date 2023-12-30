import React, { Suspense } from "react";
import Loading from "./loading";
import YourGames from "./components/YourGames";

export default function GamesLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col h-full" id="layout_games">
            <div className="bg-slate-300 px-2 pt-2 md:px-4 md:pt-4 ">
                <YourGames />
            </div>
            <Suspense fallback={<Loading />}>
                <div className="grow bg-slate-200 px-2 pt-2 md:px-4 md:pt-4 ">
                    {children}
                </div>
            </Suspense>
        </div>
    )
}
