'use client'

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ButtonAddGame({ gameId, userEmail }: { gameId: number, userEmail: string | null | undefined }) {

    const [buttonDisabled, setButtonDisabled] = useState(false)

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
        console.log("Result from fetch prisma update (in button)", result)

        setButtonDisabled(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <button
                type="submit"
                className={`p-4 text-xs hover:shadow-xl bg-slate-700 text-white`
                }
                disabled={buttonDisabled}
            >
                {buttonDisabled ? 'Saving...' : 'Add game'}
            </button>
        </form>
    )
}