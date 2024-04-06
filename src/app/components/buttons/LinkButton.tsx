'use client'

/**
 * Client component needed to be imported into server components
 */

import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";

export function LinkButton({ text, link }: { text: string, link: string }) {

    const router = useRouter()

    return (
        <Button
            type="button"
            color="primary"
            onClick={() => { router.push(`${link}`) }}
            data-testid='link'
            variant="solid"
            size='lg'
            className={`text-sm tracking-wider`}
        >
            {`${text}`}
        </Button>
    )
}
