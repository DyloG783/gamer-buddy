export interface IGame {
    id: number;
    externalId: number;
    name: string;
    summary: string | null;
    url: string | null;
    platforms: number[];
    platformNames: string[];
    gameModes: number[];
    gameModeNames: string[];
    genres: number[];
    gameGenreNames: string[];
    firstReleaseDate: number | null;
    totalRating: number | null;
}

export interface ISearchState {
    genre: number | undefined;
    platform: number | undefined;
    mode: number | undefined;
    search: string | undefined;
    genreName: string | undefined;
    platformName: string | undefined;
    modeName: string | undefined;
    currentSelected: string | undefined;
}
