'use client'

import { useSession } from "next-auth/react";

export default function ButtonAddGame() {

    const { status } = useSession()
    if (status === "unauthenticated") {
        return (
            <button className="disabled p-4 text-xs hover:shadow-xl bg-slate-700 text-white">Sign in to add game</button>
        )
    }

    return (
        <button className=" p-4 text-xs hover:shadow-xl bg-slate-700 text-white">Add game</button>
    )
}