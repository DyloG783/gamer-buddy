export type IGame = {
    id: number;
    name: string;
    summary: string | null;
    url: string | null;
    platformIds: number[];
    modeIds: number[];
    genreIds: number[];
    firstReleaseDate: number | null;
    totalRating: number | null;
} 

export type IGameAndTypes = {
    id: number;
    name: string;
    summary: string | null;
    url: string | null;
    platformIds: number[];
    modeIds: number[];
    genreIds: number[];
    firstReleaseDate: number | null;
    totalRating: number | null;
    genres: IGameFilterType[];
    platforms: IGameFilterType[];
    modes: IGameFilterType[];
}

// this replaced duplicated types for genres, platforms, and modes which are all identical
export type IGameFilterType = {
    id: number;
    name: string;
}

export type ISearchState = {
    genre: number | null;
    platform: number | null;
    mode: number | null;
    search: string | null;
    currentSelected: string | null;
}

export type IUser = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
} 

export type IConnection = ({
    followedById: string;
    followedByName: string;
    followingId: string;
    followingName: string;
    gameId: number;
    gameName: string;
})
