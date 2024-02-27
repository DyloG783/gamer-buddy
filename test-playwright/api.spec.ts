// @ts-check

import { test, expect } from '@playwright/test';
import { ISearchState } from "@/lib/custom_types";

const url = "http://localhost:3000/api/search-games";

const genreSearchState: ISearchState = {
    genre: "Fighting",
    platform: null,
    mode: null,
    search: null,
    currentSelected: "genre"
};

const textSearchState: ISearchState = {
    genre: null,
    platform: null,
    mode: null,
    search: "Icarus",
    currentSelected: "textSearch"
};

const invalidTextSearchState: ISearchState = {
    genre: null,
    platform: null,
    mode: null,
    search: "abc",
    currentSelected: "textSearch"
};

test.describe("Test 'search-games' internal api filters and returns games", () => {

    test("Test search state containing the 'Genre' of 'Fighting' returns a 'fighting' only game as part of it's array of games", async ({ request }) => {
        const response = await request.post(`${url}`, {
            data: {
                searchState: genreSearchState
            }
        });

        expect.soft(response.ok()).toBeTruthy();

        // this game ONLY has the genre of 'Fighting' ensuring it will only be returned if search state includes 'Fighting'
        const expectedtitleReturned = 26759;
        let found = false;

        const data = await response.json();

        for (const game of data.searchedGames) {
            if (game.id === expectedtitleReturned) {
                found = true;
                break;
            };
        }

        expect(found).toBeTruthy();
    });

    test(`Test text search returns games containing part of the input text in their title`, async ({ request }) => {
        const response = await request.post(`${url}`, {
            data: {
                searchState: textSearchState
            }
        });

        expect.soft(response.ok()).toBeTruthy();

        // this game returned under the title of 'Icarus'
        const expectedtitleReturned = 62770;
        let found = false;

        const data = await response.json();

        for (const game of data.searchedGames) {
            if (game.id === expectedtitleReturned) {
                found = true;
                break;
            };
        }

        expect(found).toBeTruthy();
    });

    test(`Test searching for a title that doesn't exist returns empty array`, async ({ request }) => {
        const response = await request.post(`${url}`, {
            data: {
                searchState: invalidTextSearchState
            }
        });

        expect.soft(response.ok()).toBeTruthy();

        const data = await response.json();

        expect(data.searchedGames).toHaveLength(0);
    });
});