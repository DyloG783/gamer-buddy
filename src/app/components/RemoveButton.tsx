'use client'

/**
 * Client component needed to be imported into client components
 */

import { useFormStatus } from 'react-dom'
import { Button } from "@nextui-org/react";

export function RemoveButton({ text }: { text: string }) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            color='warning'
            aria-disabled={pending}
            data-testid={`remove`}
            size='lg'
            className={`text-sm tracking-wider text-white`}
        >
            {pending ? '...' : `${text}`}
        </Button>
    )
}

