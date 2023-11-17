'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function YourGames() {

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
        <div className=" text-center ">
            <div>Content soon!</div>
        </div>
    )
}