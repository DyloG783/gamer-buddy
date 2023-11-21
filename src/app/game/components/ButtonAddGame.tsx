'use client'

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ButtonAddGame({ gameId, exists }: { gameId: number, exists: boolean }) {

    const { status, data } = useSession()
    const userEmail = data?.user?.email

    const [buttonDisabled, setButtonDisabled] = useState(false)

    if (status === "unauthenticated") {
        return (
            <button className="disabled p-4 text-xs hover:shadow-xl bg-slate-700 text-white">Sign in to add game</button>
        )
    }

    const handleSubmit = async () => {
        setButtonDisabled(true)

        const res = await fetch('http://localhost:3000/api/addGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail, gameId
            })
        })

        const result = await res.json()
        console.log("Result from prisma update (in button)", result)

        setButtonDisabled(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <button
                type="submit"
                className={`p-4 text-xs hover:shadow-xl bg-slate-700 text-white
                    ${exists ? "hidden" : ""}`
                }
                disabled={buttonDisabled}
            >
                {buttonDisabled ? 'Saving...' : 'Add game'}
            </button>
            {exists &&
                <button
                    disabled={true}
                    className="p-4 text-xs hover:shadow-xl bg-slate-700 text-white"
                >
                    You already have this game
                </button>}
        </form>
    )
}