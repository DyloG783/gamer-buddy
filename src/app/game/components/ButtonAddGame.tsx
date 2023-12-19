'use client'

import { IGame } from "@/lib/custom_types";
import { useState } from "react";

export default function ButtonAddGame({ game, userEmail, setExists }:
    {
        game: IGame,
        userEmail: string | null | undefined,
        setExists: any
    }) {

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleSubmit = async () => {
        setButtonDisabled(true)

        const res = await fetch('http://localhost:3000/api/addGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail, game
            })
        })

        const result = await res.json();
        console.log("Result from fetch prisma update (in button):", result);

        setExists(true);
        setButtonDisabled(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <button
                type="submit"
                className={`btn bg-green-600`}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? 'Saving...' : 'Add game'}
            </button>
        </form>
    )
}