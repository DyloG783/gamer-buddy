'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ text, color }: { text: string, color: string }) {
    const { pending } = useFormStatus()

    return (
        <button
            // id="add_game"
            type="submit"
            className={`btn ${color}`}
            aria-disabled={pending}
        >
            {pending ? '...' : `${text}`}
        </button>
    )
}

