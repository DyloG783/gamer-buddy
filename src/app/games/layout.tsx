import React, { Suspense } from "react";
import Loading from "@/lib/loading";
import YourGames from "./components/YourGames";

export default function GamesLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col h-full" id="layout_games">
            <div className=" px-2 pt-6 md:px-16 md:pt-8 shadow-sm">
                <YourGames />
            </div>
            <Suspense fallback={<Loading />}>
                <div className="grow px-2 pt-10 md:px-16 md:pt-10 shadow-sm"
                >
                    {children}
                </div>
            </Suspense>
        </div>
    )
}
