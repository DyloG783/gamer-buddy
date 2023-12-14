'use client'

import React, { Key, useState } from "react";
import ReactPaginate from "react-paginate";
import { IGame, IGameAndTypes, IGenre, IMode, IPlatform, ISearchState } from "@/lib/custom_types";
import Link from "next/link";

interface IPaginatedGamesProps {
    games: IGameAndTypes[]
    defaultGames: IGameAndTypes[]
    itemsPerPage: number
    searchState: ISearchState
}

interface IPageGames {
    currentItems: IGameAndTypes[]
}

const PaginatedGamesWithSearch: React.FC<IPaginatedGamesProps> = ({ games, defaultGames, itemsPerPage, searchState }) => {

    let filteredGames: IGameAndTypes[] = []

    if (searchState.currentSelected === "genre") {

        filteredGames = games.filter(game =>
            game.genreIds.includes(searchState.genre!)
        )

        if (searchState.platform) {
            filteredGames = filteredGames.filter(game =>
                game.platformIds.includes(searchState.platform!)
            )
        }
        if (searchState.mode) {
            filteredGames = filteredGames.filter(game =>
                game.modeIds.includes(searchState.mode!)
            )
        }
    }
    if (searchState.currentSelected === "platform") {
        filteredGames = games.filter(game =>
            game.platformIds.includes(searchState.platform!)
        )

        if (searchState.genre) {
            filteredGames = filteredGames.filter(game =>
                game.genreIds.includes(searchState.genre!)
            )
        }
        if (searchState.mode) {
            filteredGames = filteredGames.filter(game =>
                game.modeIds.includes(searchState.mode!)
            )
        }
    }
    if (searchState.currentSelected === "mode") {
        filteredGames = games.filter(game =>
            game.modeIds.includes(searchState.mode!)
        )

        if (searchState.genre) {
            filteredGames = filteredGames.filter(game =>
                game.genreIds.includes(searchState.genre!)
            )
        }
        if (searchState.platform) {
            filteredGames = filteredGames.filter(game =>
                game.platformIds.includes(searchState.platform!)
            )
        }
    }
    if (searchState.currentSelected === "textSearch") {
        if (searchState.genre || searchState.platform || searchState.mode) {

            filteredGames = games.filter(game => game.name.toLowerCase().includes(searchState.search!.toLowerCase()))

            if (searchState.genre) {
                filteredGames = filteredGames.filter(game =>
                    game.genreIds.includes(searchState.genre!)
                )
            }

            if (searchState.platform) {
                filteredGames = filteredGames.filter(game =>
                    game.platformIds.includes(searchState.platform!)
                )
            }

            if (searchState.mode) {
                filteredGames = filteredGames.filter(game =>
                    game.modeIds.includes(searchState.mode!)
                )
            }


        }
        else {
            filteredGames = games.filter(game => game.name.toLowerCase().includes(searchState.search!.toLowerCase()))
        }
    }
    if (searchState.currentSelected === undefined) {
        filteredGames = defaultGames
    }

    const Items: React.FC<IPageGames> = ({ currentItems }) => {
        return (
            <div className="grid md:grid-flow-col md:auto-cols-fr grid-rows-3 text-sm ">
                {currentItems &&
                    currentItems.map((game: IGameAndTypes) => (
                        <Link
                            key={game.id}
                            className=" shadow-sm hover:shadow-md p-2 whitespace-nowrap overflow-hidden"
                            href={`/game/${game.id}`}
                        >
                            <h3 className="font-bold pb-2 text-base">{game.name}</h3>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Genre</h3>
                                {game.genres.map((genre: IGenre, index: Key) => (
                                    <span key={index}>
                                        {genre.name + ", "}
                                    </span>
                                ))}
                            </div>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Mode</h3>
                                {game.modes.map((mode: IMode, index: Key) => (
                                    <span key={index}>
                                        {mode.name + ", "}
                                    </span>
                                ))}
                            </div>
                            <div className="italic pb-1">
                                <h3 className="font-bold text-gray-700">Platform</h3>
                                {game.platforms.map((platform: IPlatform, index: Key) => (
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
                        className={`flex flex-col p-4 `}
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
                            className="flex justify-around md:justify-center gap-4
                        p-2 bg-slate-400 text-white "
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