"use client"

import PaginatedGamesWithSearch from "@/app/games/components/PaginatedGamesWithSearch";
import SearchOptions from "./SearchOptions";
import { useState } from "react";
import { IGame } from "@/lib/custom_types";

type IGamesDisplayProps = {
    genres: { id: number; name: string; }[],
    platforms: { id: number; name: string; }[],
    modes: { id: number; name: string; }[],
    games: IGame[],
    defaultGames: IGame[],
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
            <PaginatedGamesWithSearch games={props.games} defaultGames={props.defaultGames} itemsPerPage={6} searchState={searchState} />
        </div>
    )
}