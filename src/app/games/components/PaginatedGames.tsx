'use client'

import React, { Key, useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { IGame } from "@/lib/custom_types";

interface IPaginatedGamesProps {
    games: IGame[]
    itemsPerPage: number
}

interface IPageGames {
    currentItems: IGame[]
}

const PaginatedGames: React.FC<IPaginatedGamesProps> = ({ games, itemsPerPage }) => {

    const Items: React.FC<IPageGames> = ({ currentItems }) => {
        return (
            <div className="grid md:grid-flow-col md:auto-cols-fr text-xs  ">
                {currentItems &&
                    currentItems.map((game: IGame) => (
                        <Link
                            key={game.id}
                            className="shadow-sm hover:shadow-md p-2 whitespace-nowrap overflow-hidden max-w-64"
                            href={`/game/${game.id}`}
                        >
                            <h3 className="font-bold pb-2 text-base text-emerald-500">{game.name}</h3>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Genre</h3>
                                {game.genres.map((genre: string, index: Key) => (
                                    <span key={index}>
                                        {genre + ", "}
                                    </span>
                                ))}
                            </div>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Mode</h3>
                                {game.modes.map((mode: string, index: Key) => (
                                    <span key={index}>
                                        {mode + ", "}
                                    </span>
                                ))}
                            </div>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Platform</h3>
                                {game.platforms.map((platform: string, index: Key) => (
                                    <span key={index}>
                                        {platform + ", "}
                                    </span>
                                ))}
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
        const currentItems = games.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(games.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event: { selected: number; }) => {
            const newOffset = (event.selected * itemsPerPage) % games.length;
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
                    className="flex justify-around md:justify-center gap-4 md:gap-6
                    p-1 md:p-2 text-slate-700"
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

export default PaginatedGames;