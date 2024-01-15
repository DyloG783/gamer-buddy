export type IGame = {
    id: number;
    name: string;
    summary: string | null;
    url: string | null;
    firstReleaseDate: number | null;
    genres: string[];
    platforms: string[];
    modes: string[];
}

// this represents genres, platforms, and modes
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
    followingEmail: string;
    followedById: string;
    followingId: string;
    followedByUName: string;
    followingUName: string;
})


export type TUserId = ({ userId: string })

export type TUnsafeMetadata = ({
    bio: string,
    timezone: string
})