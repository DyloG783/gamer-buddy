'use client'

import { IGame, IUser } from "@/lib/custom_types"
import { useState } from "react"

export default function PlayerActionBar({ player, alreadyExists, game }:
    {
        player: IUser,
        alreadyExists: boolean,
        game: IGame
    }) {

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [exists, setExists] = useState(alreadyExists)

    function ButtonConnect() {

        const handleSubmit = async () => {
            setButtonDisabled(true)

            const res = await fetch('http://localhost:3000/api/followPlayer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    player, game
                })
            })

            const result = await res.json();
            console.log("PlayerActionBar - ButtonConnect :", result);

            setButtonDisabled(false);
            setExists(true)
        }

        return (
            <form onSubmit={handleSubmit}>
                <button id="connect_button"
                    className="btn bg-green-600"
                    disabled={buttonDisabled}
                    type="submit"
                >
                    {buttonDisabled ? 'Connecting...' : 'Connect'}
                </button>
            </form>
        )
    }

    function ButtonDisconnect() {

        const handleSubmit = async () => {
            setButtonDisabled(true)

            const res = await fetch('http://localhost:3000/api/unfollowPlayer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    player, game
                })
            })

            const result = await res.json();
            console.log("PlayerActionBar - ButtonDisconnect :", result);

            setButtonDisabled(false);
            setExists(false)
        }

        return (
            <button id="connect_button"
                className="btn bg-red-500"
                onClick={handleSubmit}
                disabled={buttonDisabled}
            >
                Disconnect
            </button>
        )
    }

    return (
        <div id="player_action_bar_container"
            className="w-full mb-10 flex justify-end gap-2"
        >
            {exists
                &&
                <ButtonDisconnect />
                ||
                <ButtonConnect />
            }
        </div>
    )
}