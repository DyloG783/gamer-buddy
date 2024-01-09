'use client'

import { IGame } from "@/lib/custom_types";
import Link from "next/link";
import { useState } from "react";

export default function GameActionBar({ alreadyExists, game }: { alreadyExists: boolean, game: IGame }) {

    // using this state purely to force ui update on save/remove game, otherwise bad ux as button changes from backend
    const [exists, setExists] = useState(alreadyExists)

    function ButtonAddGame() {

        const [buttonDisabled, setButtonDisabled] = useState(false)

        const handleSubmit = async () => {
            setButtonDisabled(true)

            const res = await fetch('http://localhost:3000/api/addGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    game
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
                    id="add_game"
                    type="submit"
                    className={`btn bg-green-500`}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? 'Saving...' : 'Add game'}
                </button>
            </form>
        )
    }

    function ButtonRemoveGame() {

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
                    className={`btn bg-red-500`}
                    disabled={buttonDisabled}
                >
                    {buttonDisabled ? 'Removing...' : 'Remove game'}
                </button>
            </form>
        )
    }

    function ButtonConnect() {

        return (
            <button className="btn bg-green-500">
                <Link href={`/connect/${game.id}`}>Connect</Link>
            </button>
        )
    }

    return (
        <div id="gameActionsBar"
            className="flex gap-2 ml-6 md:ml-auto">
            <div>
                {exists
                    && <ButtonRemoveGame />
                    || <ButtonAddGame />
                }
            </div>
            <div>
                {exists && <ButtonConnect />}
            </div>
        </div>
    )
}