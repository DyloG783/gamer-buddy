"use client"

import SearchOptions from "./SearchOptions";
import { useState } from "react";

import z, { SearchableGameSchema, SearchStateSchema, GameSchema } from '@/lib/zod_schemas';
import PaginatedGames from "./PaginatedGames";

type IGamesDisplayProps = {
    genres: z.infer<typeof SearchableGameSchema>[],
    platforms: z.infer<typeof SearchableGameSchema>[],
    modes: z.infer<typeof SearchableGameSchema>[],
    defaultGames: z.infer<typeof GameSchema>[],
}

export default function GamesDisplay(props: IGamesDisplayProps) {

    const defaultSearchState: z.infer<typeof SearchStateSchema> = {
        genre: null,
        platform: null,
        mode: null,
        search: null,
        currentSelected: null
    };

    const [searchState, setSearchState] = useState(defaultSearchState);
    const [searchEmpty, setSearchEmpty] = useState(false);

    return (
        <div className="flex flex-col justify-between">
            <SearchOptions genres={props.genres} platforms={props.platforms} modes={props.modes} searchState={searchState} setSearchState={setSearchState} searchEmpty={searchEmpty} />
            <div id="games_container_all_games" className="p-6">
                {/* <PaginatedGamesSearch defaultGames={props.defaultGames} itemsPerPage={4} searchState={searchState} setSearchEmpty={setSearchEmpty} /> */}
                <PaginatedGames defaultGames={props.defaultGames} itemsPerPage={4} searchState={searchState} setSearchEmpty={setSearchEmpty} />
            </div>
        </div>
    )
}