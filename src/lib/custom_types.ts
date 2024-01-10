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
    email: string | null;
    userName: string | null;
    bio: string | null;
    timezone: string | null;
}

export type IConnection = ({
    followedByEmail: string;
    followedById: string;
    followedByUName: string;
    followingEmail: string;
    followingId: string;
    followingUName: string
})

export type TUserId = ({ userId: string })

export type TUnsafeMetadata = ({
    bio: string,
    timezone: string
})