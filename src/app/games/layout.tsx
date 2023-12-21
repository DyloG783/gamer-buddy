import React, { Suspense } from "react";
import Loading from "./loading";

export default function GamesLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="grow flex" id="layout_games">
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </div>
    )
}
