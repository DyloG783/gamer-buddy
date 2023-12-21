'use client'

import styles from './styles.module.css'
import PaginatedConnections from "./PaginatedConnections";
import { IConnection } from "@/lib/custom_types";

export default function ConnectedWith({ connections }: { connections: IConnection[], }) {

    return (
        <div className="" id="connected_with_container">
            <p className={styles.connection_header}>Connected With</p>
            <PaginatedConnections connections={connections} itemsPerPage={3} />
        </div>
    )
}

;