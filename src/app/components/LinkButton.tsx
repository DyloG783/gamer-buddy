'use client'

import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";

export function LinkButton({ text, link }: { text: string, link: string }) {

    const router = useRouter()

    return (
        <Button
            type="button"
            color="primary"
            // href={`${link}`}
            onClick={() => { router.push(`${link}`) }}
            data-testid='chat_link_button'
            variant="solid"
            size='lg'
            className={`text-sm tracking-wider`}
        >
            {`${text}`}
        </Button>
    )
}

