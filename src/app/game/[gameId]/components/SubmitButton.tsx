'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ action, text, color, gameId }: { action: any, text: string, color: string, gameId: number }) {
    const { pending } = useFormStatus()

    // adds playerId to server action
    const actionWithGameId = action.bind(null, gameId)

    return (
        <button
            id="add_game"
            type="submit"
            className={`btn ${color}`}
            aria-disabled={pending}
            onClick={async () => {
                await actionWithGameId();
            }}
        >
            {text}
        </button>
    )
}

