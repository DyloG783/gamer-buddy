import React from "react";
import { useSession } from "next-auth/react";
import Router from 'next/router';

const Connections = () => {

    const { status } = useSession()

    if (status === "unauthenticated") {
        Router.push('/api/auth/signin')
    }

    return <div>Connections</div>;

};

export default Connections;