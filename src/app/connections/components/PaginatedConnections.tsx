'use client'

import React, { useState } from "react";
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
            <div className="pl-4 md:pl-10">
                <ul className="grid md:grid-flow-col md:auto-cols-fr ">
                    {currentItems &&
                        currentItems.map((connection: IConnection) => (
                            <li key={`${connection.followedById} + ${connection.followingId}`} className="hover:shadow-md">
                                <Link
                                    className="p-4 whitespace-nowrap overflow-hidden"
                                    href={`/connect/${connection.gameId}/${connection.followedById}`}
                                >
                                    <p className="font-semibold text-gray-700 ml-2 pb-2 tracking-wide">{`${connection.followedByUName}`}</p>
                                    <p className="font-light ml-2 italic">{connection.gameName}</p>
                                </Link>
                            </li>
                        ))}
                </ul>
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
        <div className={``} id="paginated_connections" >
            <PaginatedItems itemsPerPage={itemsPerPage} />
        </div>
    )
}

export default PaginatedConnections;