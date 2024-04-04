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
    search: "Leif",
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

    test(`Test text search returns games containing part of the input text in their title`, async ({ request }) => {
        const response = await request.post(`${url}`, {
            data: {
                searchState: textSearchState
            }
        });

        expect.soft(response.ok()).toBeTruthy();

        // this game returned under the title of 'Icarus'
        const expectedtitleReturned = 85245;
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