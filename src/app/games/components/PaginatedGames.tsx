'use client'

import React, { Key, useState } from "react";
import ReactPaginate from "react-paginate";
import { IGame } from "@/lib/custom_types";
import GameCard from "./GameCard";

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
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 ">
                {currentItems &&
                    currentItems.map((game: IGame) => (
                        <div id="card_key_wrapper" key={game.id}>
                            <GameCard game={game} type="your" />
                        </div>
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
                    className="flex justify-around md:justify-center gap-2 md:gap-6
                    my-1 md:my-2 "
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