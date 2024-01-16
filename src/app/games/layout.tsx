import React, { Suspense } from "react";
import Loading from "@/lib/loading";
import YourGames from "./components/YourGames";

export default function GamesLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col h-full" id="layout_games">
            <div className="w-full shadow-sm pl-4 mt-10">
                <YourGames />
            </div>
            <Suspense fallback={<Loading />}>
                <div className="grow px-4 pt-10 md:px-8 md:pt-10 shadow-sm"
                >
                    {children}
                </div>
            </Suspense>
        </div>
    )
}
