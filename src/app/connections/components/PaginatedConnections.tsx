'use client'

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import z, { MessageSchema, ConnectionWithTimezone } from '@/lib/zod_schemas';
import ConnectionCard from "./ConnectionCard";


interface IPaginatedConnectionsProps {
    connections: z.infer<typeof ConnectionWithTimezone>[] | null
    itemsPerPage: number
    option: string,
    unseenMessages?: z.infer<typeof MessageSchema>[] | null
}

interface IItems {
    currentItems: z.infer<typeof ConnectionWithTimezone>[]
}

/**
 * 
 * Options string either: connected, requested, following
 */
const PaginatedConnections: React.FC<IPaginatedConnectionsProps> = ({ connections, itemsPerPage, option, unseenMessages }) => {

    if (connections === null) {
        return
    }

    const Items: React.FC<IItems> = ({ currentItems }) => {
        return (
            <ul className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-6">
                {currentItems &&
                    currentItems.map((connection: z.infer<typeof ConnectionWithTimezone>, index) => (
                        <div id="card_key_wrapper" key={index} className="flex justify-around">
                            {option === 'connected' && <ConnectionCard typeFlag={option} connection={connection} unseenMessages={unseenMessages} />}
                            {option === 'requested' && <ConnectionCard typeFlag={option} connection={connection} />}
                            {option === 'following' && <ConnectionCard typeFlag={option} connection={connection} />}
                        </div>
                    ))}
            </ul>
        );
    }

    const PaginatedItems = ({ itemsPerPage }: { itemsPerPage: number }) => {
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = connections.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(connections.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event: { selected: number; }) => {
            const newOffset = (event.selected * itemsPerPage) % connections.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    className="flex justify-around md:justify-center gap-2 md:gap-6
                            my-1 md:my-2"
                />
            </>
        );
    }

    return (
        <PaginatedItems itemsPerPage={itemsPerPage} />
    )
}

export default PaginatedConnections;