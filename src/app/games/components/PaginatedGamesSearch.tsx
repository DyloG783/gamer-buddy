'use client'

import React, { Key, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IGame, ISearchState } from "@/lib/custom_types";
import Link from "next/link";
import Loading from "@/lib/loading";
import GameCard from "./GameCard";

interface IPaginatedGamesProps {
    defaultGames: IGame[]
    itemsPerPage: number
    searchState: ISearchState
    setSearchEmpty: any
}

interface IPageGames {
    currentItems: IGame[]
}

const PaginatedGamesSearch: React.FC<IPaginatedGamesProps> = ({ defaultGames, itemsPerPage, searchState, setSearchEmpty }) => {

    const [searchedGames, setSearchedGames] = useState<IGame[]>([]);
    const [isLoading, setLoading] = useState(false);

    let filteredGames: IGame[] = [];

    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // fetch games from the db andfilter based on the current search state
    useEffect(() => {

        if (searchState.currentSelected) {

            setLoading(true)

            fetch(`${apiUrl}/api/search-games`, {
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
                    setSearchedGames(data.searchedGames)
                    setLoading(false)
                    filteredGames = searchedGames

                    if (data.searchedGames.length === 0) {
                        setSearchEmpty(true);
                    }
                })
        }

    }, [searchState.currentSelected]);

    if (isLoading) return <Loading />

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
                className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-nowrap ">
                {currentItems &&
                    currentItems.map((game: IGame) => (
                        <div id="card_key_wrapper" key={game.id} className="flex justify-around">
                            <GameCard game={game} type="all" />
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
                        className={`flex flex-col `}
                    >
                        <div id="game_count" className="flex mx-auto pb-4 md:pb-28">
                            {searchedGames.length === 0 && searchState.currentSelected === null &&
                                <p className="italic"> Currently showing lastest and upcoming games: <span className="primary-color-font not-italic">{filteredGames.length}</span></p>
                                ||
                                <p className="italic">Currently showing searched games: <span className="primary-color-font not-italic">{filteredGames.length}</span></p>
                            }

                        </div>
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
                    </div>
                    ||
                    <div className="m-auto ">
                        No games matched your search. Click <span className="text-teal-600">Reset search</span> to try again
                    </div>
                }
            </>
        );
    }

    return (
        <PaginatedItems itemsPerPage={itemsPerPage} />
    )
}

export default PaginatedGamesSearch;