'use client'

import Link from "next/link";
import React from "react";
import styles from './styles.module.css'
import { IConnection } from "@/lib/custom_types";

export default function Following({ userFollowing }: { userFollowing: IConnection[] }) {

    return (
        <div className="" id="following_container">
            <p className={styles.connection_header}>Following</p>
            <ul className={styles.connection_items_container}>
                {userFollowing.map(by => (
                    <li key={by.followingId} className={styles.connection_items}>
                        <Link href={`/connect/${by.gameId}/${by.followingId}`}
                            key={by.followingId}
                            className={`hover:text-purple-700`}
                        >
                            <p >{by.followingUName}, Game: {by.gameName}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

;