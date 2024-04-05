'use client'

/**
 * Client component needed to be imported into client components
 */

import { useFormStatus } from 'react-dom';
import { Button } from "@nextui-org/react";

// formId required on a page when button is not nested in the form
export function SubmitButton({ text, formId }: { text: string, formId?: string }) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            color='primary'
            aria-disabled={pending}
            data-testid={`submit`}
            size='lg'
            className={`text-sm tracking-wider`}
            form={formId}
        >
            {pending ? '...' : `${text}`}
        </Button>
    )
}

