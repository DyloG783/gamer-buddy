'use client'

import React, { Key, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IGameAndTypes, IGameFilterType, ISearchState } from "@/lib/custom_types";
import Link from "next/link";

interface IPaginatedGamesProps {
    defaultGames: IGameAndTypes[]
    itemsPerPage: number
    searchState: ISearchState
    setSearchEmpty: any
}

interface IPageGames {
    currentItems: IGameAndTypes[]
}

const PaginatedGamesWithSearch: React.FC<IPaginatedGamesProps> = ({ defaultGames, itemsPerPage, searchState, setSearchEmpty }) => {

    const [searchedGames, setSearchedGames] = useState<IGameAndTypes[]>([])
    const [isLoading, setLoading] = useState(false)

    let filteredGames: IGameAndTypes[] = []

    // fetch games from the db andfilter based on the current search state
    useEffect(() => {

        if (searchState.currentSelected) {

            setLoading(true)

            fetch('http://localhost:3000/api/search-games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    searchState
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("rendering to set games now")
                    setSearchedGames(data.searchedGames)
                    setLoading(false)
                    filteredGames = searchedGames

                    if (data.searchedGames.length === 0) {
                        setSearchEmpty(true);
                    }
                })
        }

    }, [searchState.currentSelected]);

    if (isLoading) return <p>Loading...</p>

    // the games to be displayed are either default, or what was returned from searching
    if (searchedGames.length === 0 && searchState.currentSelected === null) {
        filteredGames = defaultGames;
    }
    if (searchedGames.length > 0) {
        filteredGames = searchedGames;
    }

    // the display for each games (2 by 3 column layout) 
    const Items: React.FC<IPageGames> = ({ currentItems }) => {
        return (
            <div id="games_grid_view"
                className="grid md:grid-flow-col md:auto-cols-fr grid-rows-3 text-sm ">
                {currentItems &&
                    currentItems.map((game: IGameAndTypes) => (
                        <Link
                            key={game.id}
                            id="game_link_view"
                            className=" shadow-sm hover:shadow-md p-2 whitespace-nowrap overflow-hidden"
                            href={`/game/${game.id}`}
                        >
                            <h3 className="font-bold pb-2 text-base">{game.name}</h3>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Genre</h3>
                                {game.genres.map((genre: IGameFilterType, index: Key) => (
                                    <span key={index}>
                                        {genre.name + ", "}
                                    </span>
                                ))}
                            </div>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Mode</h3>
                                {game.modes.map((mode: IGameFilterType, index: Key) => (
                                    <span key={index}>
                                        {mode.name + ", "}
                                    </span>
                                ))}
                            </div>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Platform</h3>
                                {game.platforms.map((platform: IGameFilterType, index: Key) => (
                                    <span key={index}>
                                        {platform.name + ", "}
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
        const currentItems = filteredGames.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(filteredGames.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event: { selected: number; }) => {
            const newOffset = (event.selected * itemsPerPage) % filteredGames.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                {filteredGames.length > 0
                    &&
                    <div
                        id="paginated_Games_with_search"
                        className={`flex flex-col  `}
                    >
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
                            p-1 md:p-4 bg text-slate-700 "
                        />
                    </div>
                    ||
                    <div className="mx-auto my-2 md:my-10">
                        No games matched your search. Reset the search to try again
                    </div>
                }
            </>
        );
    }

    return (
        <PaginatedItems itemsPerPage={itemsPerPage} />
    )
}

export default PaginatedGamesWithSearch;