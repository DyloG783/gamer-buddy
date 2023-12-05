'use client'

import React, { Key, useState } from "react";
import ReactPaginate from "react-paginate";
import { IGame } from "@/lib/custom_types";
import { ISearchState } from "@/lib/custom_types";
import Link from "next/link";


interface IPaginatedGamesProps {
    games: IGame[]
    defaultGames: IGame[]
    itemsPerPage: number
    searchState: ISearchState
}

interface IPageGames {
    currentItems: IGame[]
}

const PaginatedGamesWithSearch: React.FC<IPaginatedGamesProps> = ({ games, defaultGames, itemsPerPage, searchState }) => {

    let filteredGames: IGame[] = []

    if (searchState.currentSelected === "genre") {

        filteredGames = games.filter(game =>
            game.genres.includes(searchState.genre as number)
        )

        if (searchState.platform) {
            filteredGames = filteredGames.filter(game =>
                game.platforms.includes(searchState.platform as number)
            )
        }
        if (searchState.mode) {
            filteredGames = filteredGames.filter(game =>
                game.gameModes.includes(searchState.mode as number)
            )
        }
    }
    if (searchState.currentSelected === "platform") {
        filteredGames = games.filter(game =>
            game.platforms.includes(searchState.platform as number)
        )

        if (searchState.genre) {
            filteredGames = filteredGames.filter(game =>
                game.genres.includes(searchState.genre as number)
            )
        }
        if (searchState.mode) {
            filteredGames = filteredGames.filter(game =>
                game.gameModes.includes(searchState.mode as number)
            )
        }
    }
    if (searchState.currentSelected === "mode") {
        filteredGames = games.filter(game =>
            game.gameModes.includes(searchState.mode as number)
        )

        if (searchState.genre) {
            filteredGames = filteredGames.filter(game =>
                game.genres.includes(searchState.genre as number)
            )
        }
        if (searchState.platform) {
            filteredGames = filteredGames.filter(game =>
                game.platforms.includes(searchState.platform as number)
            )
        }
    }
    if (searchState.currentSelected === "textSearch") {
        if (searchState.genre || searchState.platform || searchState.mode) {
            filteredGames = filteredGames.filter(game => game.name.toLowerCase().includes(searchState.search!.toLowerCase() as string))
        }
        else {
            filteredGames = games.filter(game => game.name.toLowerCase().includes(searchState.search!.toLowerCase() as string))
        }
    }
    if (searchState.currentSelected === undefined) {
        filteredGames = defaultGames
    }

    const Items: React.FC<IPageGames> = ({ currentItems }) => {
        return (
            <div className="grid md:grid-flow-col md:auto-cols-fr grid-rows-3 text-sm ">
                {currentItems &&
                    currentItems.map((game: IGame) => (
                        <Link
                            key={game.externalId}
                            className=" shadow-sm hover:shadow-md p-2 whitespace-nowrap overflow-hidden"
                            href={`/game/${game.externalId}`}
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