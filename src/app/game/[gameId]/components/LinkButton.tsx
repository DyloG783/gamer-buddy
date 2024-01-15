'use client'

import { useRouter } from 'next/navigation'

export function LinkButton({ text, css, link }: { text: string, css?: string, link: string }) {

    const router = useRouter()

    return (
        <button
            type="button"
            className={`btn-primary ${css}`}
            onClick={() => { router.push(`${link}`) }}
        >
            {`${text}`}
        </button>
    )
}

