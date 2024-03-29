export type IGame = {
    id: number;
    name: string;
    summary: string | null;
    url: string | null;
    firstReleaseDate: number | null;
    genres: string[];
    platforms: string[];
    modes: string[];
    _count?: {
        users: number;
    }
}

export type ISearchableGameType = {
    value: string;
    label: string;
}

export type ISearchState = {
    genre: string | null;
    platform: string | null;
    mode: string | null;
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
    followedBy?: {
        timezone: string | null;
    };
} & {
    following?: {
        timezone: string | null;
    };
} & {
    followedByEmail: string;
    followingEmail: string;
    followedById: string;
    followingId: string;
    followedByUName: string;
    followingUName: string;
})

export type TUnsafeMetadata = ({
    bio: string,
    timezone: string
})

export type TMessage = (
    {
        createdAt: Date;
        message: string;
        id: string;
        chatPrivateRoomId: string;
        senderId: string;
        receiverId: string;
        seen: boolean;
    }
)