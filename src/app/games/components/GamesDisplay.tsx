"use client"

import PaginatedGamesWithSearch from "@/app/games/components/PaginatedGamesWithSearch";
import SearchOptions from "./SearchOptions";
import { useState } from "react";
import { IGameAndTypes, IGameFilterType, } from "@/lib/custom_types";

type IGamesDisplayProps = {
    genres: IGameFilterType[],
    platforms: IGameFilterType[],
    modes: IGameFilterType[],
    games: IGameAndTypes[],
    defaultGames: IGameAndTypes[],
}

export default function GamesDisplay(props: IGamesDisplayProps) {

    const defaultState = {
        genre: undefined,
        platform: undefined,
        mode: undefined,
        search: undefined,
        currentSelected: undefined
    }

    const [searchState, setSearchState] = useState(defaultState)

    return (
        <div className="grow flex flex-col justify-between bg-slate-300 mt-4">
            <SearchOptions genres={props.genres} platforms={props.platforms} modes={props.modes} searchState={searchState} setSearchState={setSearchState} defaultState={defaultState} />
            {/* <PaginatedGamesWithSearch defaultGames={props.defaultGames} itemsPerPage={6} searchState={searchState} /> */}
            <PaginatedGamesWithSearch games={props.games} defaultGames={props.defaultGames} itemsPerPage={6} searchState={searchState} />
        </div>
    )
}