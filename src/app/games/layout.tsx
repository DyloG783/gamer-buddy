import React, { Suspense } from "react";
import Loading from "./loading";
import YourGames from "./components/YourGames";

export default function GamesLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col h-full" id="layout_games">
            <div className=" px-2 pt-2 md:px-16 md:pt-8 bg-gradient-to-tr from-sky-50 to-emerald-50">
                <YourGames />
            </div>
            <Suspense fallback={<Loading />}>
                <div className="grow px-2 pt-2 md:px-16 md:pt-8 
                bg-gradient-to-bl from-blue-100 to-sky-50"
                >
                    {children}
                </div>
            </Suspense>
        </div>
    )
}
