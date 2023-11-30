'use client'

import { IGame } from "@/lib/custom_types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PaginatedGames from "./PaginatedGames";

interface IYourGamesProps {
    yourGames: IGame[];
}

const YourGames: React.FC<IYourGamesProps> = ({ yourGames }) => {

    // auth check for active session redirecting to sign in if not
    const { status } = useSession()

    if (status === "unauthenticated") {
        return (
            <div className="">
                <Link href="/api/auth/signin" className='flex justify-around items-center w-full p-3 hover:shadow-lg '>Sign in to see your games</Link>
            </div>
        )
    }

    return (
        <div className=" ">
            {yourGames.length > 0
                &&
                <PaginatedGames games={yourGames} itemsPerPage={3} />
                ||
                <p>You don't have any games</p>
            }
        </div>
    )
}

export default YourGames;