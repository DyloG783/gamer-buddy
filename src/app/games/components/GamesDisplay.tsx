"use client"

import PaginatedGamesWithSearch from "@/app/games/components/PaginatedGamesWithSearch";
import SearchOptions from "./SearchOptions";
import { useState } from "react";

export default function GamesDisplay(props: any) {

    const defaultState = {
        genre: undefined,
        genreName: undefined,
        platform: undefined,
        platformName: undefined,
        mode: undefined,
        modeName: undefined,
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