'use client'

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { IConnection } from "@/lib/custom_types";
import Link from "next/link";

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
            <div className="">
                <ul className="grid md:grid-flow-col md:auto-cols-fr ">
                    {currentItems &&
                        currentItems.map((connection: any, index) => (
                            <li key={index} className="hover:shadow-md md:max-w-64 p-2 md:p-8 md:ml-2">
                                {option === "connected"
                                    &&
                                    <Link

                                        href={`/connections/view-player/${connection.followedById}`}
                                    >
                                        <p className="font-semibold text-emerald-600 tracking-wider pb-2">{`${connection.followedByUName}`}</p>
                                        {connection.followedBy.timezone != null
                                            &&
                                            <p className=" text-xs  tracking-wide">{`${connection.followedBy.timezone}`}</p>
                                        }
                                    </Link>
                                }
                                {option === "requests"
                                    &&
                                    <Link

                                        href={`/connections/view-player/${connection.followedById}`}
                                    >
                                        <p className="font-semibold text-emerald-600 tracking-wider pb-2">{`${connection.followedByUName}`}</p>
                                        {connection.followedBy.timezone != null
                                            &&
                                            <p className=" text-xs tracking-wide">{`${connection.followedBy.timezone}`}</p>
                                        }
                                    </Link>
                                }
                                {option === "following"
                                    &&
                                    <Link

                                        href={`/connections/view-player/${connection.followingId}`}
                                    >
                                        <p className="font-semibold text-emerald-600 tracking-wider pb-2">{`${connection.followingUName}`}</p>
                                        {connection.following.timezone != null
                                            &&
                                            <p className="text-xs tracking-wide">{`${connection.following.timezone}`}</p>
                                        }

                                    </Link>
                                }
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
                    p-1 md:p-2 border border-solid"
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