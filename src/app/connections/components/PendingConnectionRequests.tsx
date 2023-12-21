'use client'

import Link from "next/link";
import React from "react";
import styles from './styles.module.css'
import { IConnection } from "@/lib/custom_types";

export default function PendingConnectionRequests({ requests }: { requests: IConnection[], }) {

    return (
        <div className="" id="connection_request_container">
            <p className={styles.connection_header}>Connection requests</p>
            <ul className={styles.connection_items_container}>
                {requests.map(req => (
                    <li key={`${req.followingId}`} className={styles.connection_items}>
                        <Link href={`/connect/${req.gameId}/${req.followedById}`}
                            key={req.followingId}
                            className={`hover:text-purple-700`}
                        >
                            <p>{req.followedByName}, Game: {req.gameName}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

;