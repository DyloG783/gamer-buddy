'use client'

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { IConnection } from "@/lib/custom_types";
import ConnectionsCard from "./ConnectionsCard";

interface IPaginatedConnectionsProps {
    connections: IConnection[] | null
    itemsPerPage: number
    option: string
}

interface IItems {
    currentItems: IConnection[]
}

const PaginatedConnections: React.FC<IPaginatedConnectionsProps> = ({ connections, itemsPerPage, option }) => {

    if (connections === null) {
        return
    }

    const Items: React.FC<IItems> = ({ currentItems }) => {
        return (
            <ul className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-6">
                {currentItems &&
                    currentItems.map((connection: any, index) => (
                        <div id="card_key_wrapper" key={index} className="flex justify-around">
                            <ConnectionsCard connection={connection} type={option} />
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