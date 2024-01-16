"use client"

import PaginatedGamesWithSearch from "@/app/games/components/PaginatedGamesWithSearch";
import SearchOptions from "./SearchOptions";
import { useState } from "react";
import { IGame, ISearchState, ISearchableGameType } from "@/lib/custom_types";

type IGamesDisplayProps = {
    genres: ISearchableGameType[],
    platforms: ISearchableGameType[],
    modes: ISearchableGameType[],
    defaultGames: IGame[],
}


export default function GamesDisplay(props: IGamesDisplayProps) {

    const defaultSearchState: ISearchState = {
        genre: null,
        platform: null,
        mode: null,
        search: null,
        currentSelected: null
    };

    const [searchState, setSearchState] = useState(defaultSearchState);
    const [searchEmpty, setSearchEmpty] = useState(false);

    return (
        <div className="flex flex-col h-full justify-between">
            <SearchOptions genres={props.genres} platforms={props.platforms} modes={props.modes} searchState={searchState} setSearchState={setSearchState} searchEmpty={searchEmpty} />
            <PaginatedGamesWithSearch defaultGames={props.defaultGames} itemsPerPage={6} searchState={searchState} setSearchEmpty={setSearchEmpty} />
        </div>
    )
}