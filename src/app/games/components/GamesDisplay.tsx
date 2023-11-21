"use client"

import PaginatedGames from "@/app/games/components/PaginatedGames";
import SearchOptions from "./SearchOptions";
import { useState } from "react";

export default function GamesDisplay(props: any) {

    const [searchState, setSearchState] = useState({
        genre: undefined,
        genreName: undefined,
        platform: undefined,
        platformName: undefined,
        mode: undefined,
        modeName: undefined,
        search: undefined,
        currentSelected: undefined
    })

    return (
        <div className="grow flex flex-col justify-between">
            <SearchOptions genres={props.genres} platforms={props.platforms} modes={props.modes} searchState={searchState} setSearchState={setSearchState} />
            <PaginatedGames games={props.games} defaultGames={props.defaultGames} itemsPerPage={6} searchState={searchState} />
        </div>
    )
}