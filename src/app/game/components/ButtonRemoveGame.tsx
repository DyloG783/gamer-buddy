'use client'

import { useState } from "react";

export default function ButtonRemoveGame({ gameId, userEmail }: { gameId: number, userEmail: string | null | undefined }) {

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleSubmit = async () => {
        setButtonDisabled(true)

        const res = await fetch('http://localhost:3000/api/removeGame', {
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
                className={`btn`}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? 'Removing...' : 'Remove game'}
            </button>
        </form>
    )
}