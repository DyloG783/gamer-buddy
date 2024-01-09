'use client'

import { IGame, IUser } from "@/lib/custom_types"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useState } from "react"

export default function PlayerActionBar({ player, alreadyExists, usersAreConnected }:
    {
        player: IUser,
        alreadyExists: boolean,
        usersAreConnected: boolean
    }) {

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [exists, setExists] = useState(alreadyExists)

    // client side Clerk authentication
    const { user, isLoaded } = useUser();
    if (!isLoaded) { // makes sure clerk user is ready to use
        return null;
    }

    function ButtonConnect() {

        const handleSubmit = async () => {
            setButtonDisabled(true)

            const res = await fetch('http://localhost:3000/api/followPlayer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    player
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
                    player
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
            {exists && user
                &&
                <>
                    <ButtonDisconnect />
                    {usersAreConnected
                        &&
                        // <button className="btn bg-green-500">
                        //     <Link href={`/connections/${user.id}/${player.id}`}
                        //         className="w-full">
                        //         Chat
                        //     </Link>
                        // </button>
                        <Link href={`/connections/${user.id}/${player.id}`}
                            className="btn bg-green-500 text-center">
                            Chat
                        </Link>
                    }
                </>
                ||
                <ButtonConnect />
            }
        </div>
    )
}