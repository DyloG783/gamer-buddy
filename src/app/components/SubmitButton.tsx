'use client'

import { useFormStatus } from 'react-dom'
import { Button } from "@nextui-org/react";

export function SubmitButton({ text }: { text: string }) {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            color='primary'
            aria-disabled={pending}
            data-testid={`submit`}
            size='lg'
            className={`text-sm tracking-wider`}
        >
            {pending ? '...' : `${text}`}
        </Button>
    )
}

