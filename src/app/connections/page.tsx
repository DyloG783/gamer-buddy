'use client'

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

const Connections = () => {

    const { status } = useSession()
    const router = useRouter()

    if (status === "unauthenticated") {
        router.push('/api/auth/signin')
    }

    return <div>Connections</div>;

};

export default Connections;