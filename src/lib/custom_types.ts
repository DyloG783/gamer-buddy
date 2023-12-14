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
    genres: IGenre[];
    platforms: IPlatform[];
    modes: IMode[];
}

export type IGenre = {
    id: number;
    name: string;
}

export type IPlatform = {
    id: number;
    name: string;
}

export type IMode = {
    id: number;
    name: string;
}

export interface ISearchState {
    genre: number | undefined;
    platform: number | undefined;
    mode: number | undefined;
    search: string | undefined;
    currentSelected: string | undefined;
}

export type IUser = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
} 
