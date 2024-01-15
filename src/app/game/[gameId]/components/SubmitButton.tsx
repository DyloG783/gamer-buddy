'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ text, css }: { text: string, css: string }) {
    const { pending } = useFormStatus()

    return (
        <button
            // id="add_game"
            type="submit"
            className={`btn-primary ${css}`}
            aria-disabled={pending}
        >
            {pending ? '...' : `${text}`}
        </button>
    )
}

