import { useSession } from "next-auth/react";
import Router from 'next/router';
import AboutYou from "@/components/profile/AboutYou";
import Username from "@/components/profile/Username";

export default function Profile() {

    const { status } = useSession()

    if (status === "unauthenticated") {
        Router.push('/api/auth/signin')
    }

    return (
        <main className="flex justify-around text-sm md:text-base lg:text-lg">
            <div className="flex flex-col w-3/4 md:w-1/2">
                <Username />
                <AboutYou />
            </div>
        </main>
    );
};
