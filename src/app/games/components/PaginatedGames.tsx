'use client'

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import z, { GameSchema, SearchStateSchema } from '@/lib/zod_schemas';

import GameCard from "./GameCard";
import Loading from "@/lib/loading";

interface IPaginatedGamesProps {
    games?: z.infer<typeof GameSchema>[];
    itemsPerPage: number;
    defaultGames?: z.infer<typeof GameSchema>[]
    searchState?: z.infer<typeof SearchStateSchema>
    setSearchEmpty?: any
};

interface IPageGames {
    currentItems: z.infer<typeof GameSchema>[];
};

const PaginatedGames: React.FC<IPaginatedGamesProps> = ({ games, itemsPerPage, defaultGames, searchState, setSearchEmpty }) => {

    const [searchedGames, setSearchedGames] = useState<z.infer<typeof GameSchema>[]>([]);
    const [isLoading, setLoading] = useState(false);

    let filteredGames: z.infer<typeof GameSchema>[] = [];

    // fetch games from the db and filter based on the current search state
    useEffect(() => {
        // if component is used with optional params use this (using search state but any would work?)...
        if (searchState) {
            if (searchState.currentSelected) {
                setLoading(true);
                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search-games`, {
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
                        if (data.error) {
                            setSearchedGames([])
                            setLoading(false)
                            return
                        };

                        setSearchedGames(data.searchedGames)
                        setLoading(false)
                        filteredGames = searchedGames

                        if (data.searchedGames.length === 0) {
                            setSearchEmpty(true);
                        }
                    })
            }
        }

    }, [searchState]);

    if (isLoading) {
        return (
            <div className="fixed top-3/4 left-1/2 ">
                <Loading />
            </div>
        )
    };

    /**
     * the games to be displayed are either default, or what was returned from searching
     * 
     * If default games have been passed in using complex variant...
     */
    if (searchState && defaultGames && searchedGames.length === 0 && searchState.currentSelected === null) {
        filteredGames = defaultGames;
    }
    if (searchedGames.length > 0) {
        filteredGames = searchedGames;
    }

    const Items: React.FC<IPageGames> = ({ currentItems }) => {
        return (
            <div className="flex flex-col flex-wrap md:flex-row gap-2 md:gap-6 ">
                {currentItems &&
                    currentItems.map((game: z.infer<typeof GameSchema>) => (
                        <div id="card_key_wrapper" key={game.id}>
                            {defaultGames &&
                                <GameCard game={game} type="all" />
                                ||
                                <GameCard game={game} type="your" />
                            }
                        </div>
                    ))}
            </div>
        );
    };

    const PaginatedItems = ({ itemsPerPage }: { itemsPerPage: number }) => {
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;

        let currentItems: z.infer<typeof GameSchema>[] = [];
        let pageCount = 3;
        let handlePageClick;
        // variation...
        if (searchState) {
            currentItems = filteredGames.slice(itemOffset, endOffset);
            pageCount = Math.ceil(filteredGames.length / itemsPerPage);
            // Invoke when user click to request another page.
            handlePageClick = (event: { selected: number; }) => {
                const newOffset = (event.selected * itemsPerPage) % filteredGames.length;
                setItemOffset(newOffset);
            };
        }
        else if (games) {
            currentItems = games.slice(itemOffset, endOffset);
            pageCount = Math.ceil(games.length / itemsPerPage);
            // Invoke when user click to request another page.
            handlePageClick = (event: { selected: number; }) => {
                const newOffset = (event.selected * itemsPerPage) % games.length;
                setItemOffset(newOffset);
            };
        }

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