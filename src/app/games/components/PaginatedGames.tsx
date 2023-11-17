'use client'

import React, { Key, useState } from "react";
import ReactPaginate from "react-paginate";
import { IGame } from "@/lib/custom_types";
import Link from "next/link";

interface IPaginatedItemsProps {
    itemsPerPage: number
}

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
            <div className="grid md:grid-flow-col md:auto-cols-fr grid-rows-3 text-sm ">
                {currentItems &&
                    currentItems.map((game: IGame) => (
                        <Link
                            key={game.externalId}
                            className=" shadow-sm hover:shadow-md p-2 whitespace-nowrap overflow-hidden"
                            href={`/game/${game.id}`}
                        >
                            <h3 className="font-bold pb-2 text-base">{game.name}</h3>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Genre</h3>
                                {game.gameGenreNames.map((genre: string, index: Key) => (
                                    <span key={index}>
                                        {genre + ", "}
                                    </span>
                                ))}
                            </div>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Mode</h3>
                                {game.gameModeNames.map((mode: string, index: Key) => (
                                    <span key={index}>
                                        {mode + ", "}
                                    </span>
                                ))}
                            </div>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Platform</h3>
                                {game.platformNames.map((platform: string, index: Key) => (
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

    const PaginatedItems: React.FC<IPaginatedItemsProps> = ({ itemsPerPage }) => {
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
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="flex justify-around md:justify-center md:gap-3
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

export default PaginatedGames;