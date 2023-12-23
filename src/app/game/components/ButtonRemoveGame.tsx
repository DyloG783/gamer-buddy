'use client'

import { IGame } from "@/lib/custom_types";
import { useState } from "react";

export default function ButtonRemoveGame({ game, setExists }:
    {
        game: IGame,
        setExists: any
    }) {

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleSubmit = async () => {
        setButtonDisabled(true)

        const res = await fetch('http://localhost:3000/api/removeGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game
            })
        })

        const result = await res.json()
        console.log("Result from fetch prisma update (in button)", result);

        setExists(false);

        setButtonDisabled(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <button
                type="submit"
                className={`btn bg-red-600`}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? 'Removing...' : 'Remove game'}
            </button>
        </form>
    )
}