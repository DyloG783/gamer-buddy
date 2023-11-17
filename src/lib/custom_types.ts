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
}
