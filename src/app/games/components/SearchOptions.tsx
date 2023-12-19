'use client'

import React, { useEffect, useState } from "react";
import { ISearchState } from "@/lib/custom_types";
import { useRouter } from "next/navigation";

// 'ISearchableGameType'represents either genres, platforms, or modes which have the
// same data structure in the db
interface ISearchableGameType {
    id: number;
    name: string;
}

interface ISearchOptionsProps {
    genres: ISearchableGameType[];
    platforms: ISearchableGameType[];
    modes: ISearchableGameType[];
    searchState: ISearchState;
    setSearchState: any;
}

interface ISelectSearchProps {
    categoryList: ISearchableGameType[];
    categoryName: string;
}

const SearchOptions: React.FC<ISearchOptionsProps> = ({ genres, platforms, modes, searchState, setSearchState }) => {

    const SelectSearch: React.FC<ISelectSearchProps> = ({ categoryList, categoryName }) => {

        const [categoryListSelection, setCategoryListSelection] = useState(999999)

        useEffect(() => {
            if (categoryListSelection != 999999) {
                if (categoryName === "Genre") {
                    setSearchState({
                        ...searchState,
                        genre: categoryListSelection,
                        currentSelected: "genre"
                    })
                }
                if (categoryName === "Platform") {
                    setSearchState({
                        ...searchState,
                        platform: categoryListSelection,
                        currentSelected: "platform"
                    })
                }
                if (categoryName === "Mode") {
                    setSearchState({
                        ...searchState,
                        mode: categoryListSelection,
                        currentSelected: "mode"
                    })
                }
            }
        }, [categoryListSelection])

        const handleSubmit = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setCategoryListSelection(
                Number(e.target.value)
            )
        }


        return (
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold p-1">{categoryName}</h2>
                <select
                    name="select_Search_Options"
                    onChange={e => handleSubmit(e)}

                    value={categoryName === "Genre" && searchState.genre != null ? searchState.genre
                        : categoryName === "Platform" && searchState.platform != null ? searchState.platform
                            : categoryName === "Mode" && searchState.mode != null ? searchState.mode
                                : ""
                    }
                    className="w-56 bg-slate-200 text-sm md:text-base"
                >
                    {categoryList.map((listItem) =>
                        <option key={listItem.id} value={listItem.id}>
                            {listItem.name}
                        </option>
                    )}
                </select>
            </div>
        )
    }

    const TextSearch: React.FC = () => {

        const [input, setInput] = useState("")
        const [submitText, setSubmitText] = useState("")

        useEffect(() => {
            if (submitText != "") {
                setSearchState({
                    ...searchState,
                    search: submitText,
                    currentSelected: "textSearch"
                })
            }
        }, [submitText])

        const handleSubmit = (e: any) => {
            if (e.key === 'Enter') {
                setSubmitText(input)
            }
        }

        return (
            <div className="flex flex-col gap-1">
                <h2 className="font-semibold p-1">Search</h2>
                <input
                    name="input"
                    placeholder={searchState.search ? searchState.search : "Search for game name"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleSubmit}
                    className="bg-slate-200 w-56 text-sm md:text-base"
                >
                </input>
            </div>
        )
    }

    return (
        <div id="search_options_and_reset_button"
            className="flex flex-col p-2 md:p-8"
        >
            <button
                id="reset_search"
                onClick={() => window.location.reload()}
                className="btn p-2 max-w-[100px] ml-auto"
            >
                Reset search
            </button>
            <div className="flex flex-wrap gap-4 justify-center pb-4 sm:text-sm md:text-base lg:text-lg"
                id="search_options"
            >
                <SelectSearch categoryList={genres} categoryName="Genre" />
                <SelectSearch categoryList={platforms} categoryName="Platform" />
                <SelectSearch categoryList={modes} categoryName="Mode" />
                <TextSearch />
            </div>
        </div>
    )
}

export default SearchOptions