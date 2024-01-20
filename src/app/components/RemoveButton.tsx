'use client'

import { useFormStatus } from 'react-dom'
import { Button, ButtonGroup } from "@nextui-org/react";

export function RemoveButton({ text }: { text: string }) {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            color='danger'
            aria-disabled={pending}
            data-testid={`remove`}
            size='lg'
            className={`text-sm tracking-wider`}
        >
            {pending ? '...' : `${text}`}
        </Button>
    )
}

