'use client'

import { useFormStatus } from 'react-dom'

export function ConnectButton({ action, text, color, player }: { action: any, text: string, color: string, player: any }) {
    const { pending } = useFormStatus()

    // adds playerId to server action
    const actionWithPlayer = action.bind(null, player)

    return (
        <button
            id="add_game"
            type="submit"
            className={`btn ${color}`}
            aria-disabled={pending}
            onClick={async () => {
                await actionWithPlayer();
            }}
        >
            {text}
        </button>
    )
}

