import React, { Suspense } from "react";
import YourGames from "./components/YourGames";
import Loading from "./loading";
import prisma from "@/lib/db";

export default function GamesLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="grow flex" id="layout_games">
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </div>
    )
}
