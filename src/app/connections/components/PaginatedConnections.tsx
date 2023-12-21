'use client'

import React, { Key, useState } from "react";
import ReactPaginate from "react-paginate";
import { IConnection } from "@/lib/custom_types";
import Link from "next/link";

interface IPaginatedConnectionsProps {
    connections: IConnection[]
    itemsPerPage: number
}

interface IItems {
    currentItems: IConnection[]
}

const PaginatedConnections: React.FC<IPaginatedConnectionsProps> = ({ connections, itemsPerPage }) => {

    const Items: React.FC<IItems> = ({ currentItems }) => {
        return (
            <div className="grid md:grid-flow-col md:auto-cols-fr text-xs pb-2 ">
                {currentItems &&
                    currentItems.map((connection: IConnection) => (
                        <Link
                            key={`${connection.followingId}`}
                            className="shadow-sm hover:shadow-md p-2 whitespace-nowrap overflow-hidden"
                            href={`/connect/${connection.gameId}/${connection.followedById}`}
                        >
                            <h3 className="font-bold pb-2 text-base">{connection.gameName}</h3>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">{`${connection.followedByName}`}</h3>
                            </div>
                        </Link>
                    ))}
            </div>
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
                    className="flex justify-around md:justify-center md:gap-4
                    p-1 md:p-2 bg-slate-400 text-white "
                />
            </>
        );
    }

    return (
        <div className={`flex flex-col`} id="paginated_Games" >
            <PaginatedItems itemsPerPage={itemsPerPage} />
        </div>
    )
}

export default PaginatedConnections;