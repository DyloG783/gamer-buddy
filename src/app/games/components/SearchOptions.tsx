'use client'

import React, { useEffect, useState } from "react";
import { ISearchState } from "@/lib/custom_types";

// 'ISearchableGameType'represents either genres, platforms, or modes which have the
// same data structure in the db
interface ISearchableGameType {
    id: number;
    externalId: number;
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

        const [categoryListSelection, setCategoryListSelection] = useState({
            id: 0,
            name: ""
        })

        useEffect(() => {
            if (categoryListSelection.id != 0) {
                if (categoryName === "Genre") {
                    setSearchState({
                        ...searchState,
                        genre: categoryListSelection.id,
                        genreName: categoryListSelection.name,
                        currentSelected: "genre"
                    })
                }
                if (categoryName === "Platform") {
                    setSearchState({
                        ...searchState,
                        platform: categoryListSelection.id,
                        platformName: categoryListSelection.name,
                        currentSelected: "platform"
                    })
                }
                if (categoryName === "Mode") {
                    setSearchState({
                        ...searchState,
                        mode: categoryListSelection.id,
                        modeName: categoryListSelection.name,
                        currentSelected: "mode"
                    })
                }
            }
        }, [categoryListSelection])

        const handleSubmit = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setCategoryListSelection({
                id: Number(e.target.value),
                name: e.target.options[e.target.selectedIndex].innerHTML
            })
        }


        return (
            <div className="flex flex-col gap-2">
                <h2 className="font-bold p-1">{categoryName}</h2>
                <select
                    name="select_Search_Options"
                    onChange={e => handleSubmit(e)}

                    value={categoryName === "Genre" ? searchState.genre!
                        : categoryName === "Platform" ? searchState.platform!
                            : categoryName === "Mode" ? searchState.mode!
                                : ""
                    }
                    className="w-56"
                >
                    {categoryList.map((listItem) =>
                        <option key={listItem.externalId} value={listItem.externalId}>
                            {listItem.name}
                        </option>
                    )}
                </select>
            </div>
        )
    }

    const TextSearch: React.FC = () => {

        const [input, setInput] = useState("")
        const [submitText, setSubmitText] = useState("placeholder")

        useEffect(() => {
            if (submitText != "placeholder") {
                setSearchState({
                    ...searchState,
                    search: submitText
                })
            }
        }, [submitText])

        const handleSubmit = (e: any) => {
            if (e.key === 'Enter') {
                setSubmitText(input)
            }
        }

        return (
            <div className="flex flex-col gap-2">
                <h2 className="font-bold p-1">Search</h2>
                <input
                    name="input"
                    placeholder={searchState.search ? searchState.search : "Search for game name"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleSubmit}
                >
                </input>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-4 justify-between pb-4 sm:text-sm md:text-base lg:text-lg"
            id="search_options"
        >
            <SelectSearch categoryList={genres} categoryName="Genre" />
            <SelectSearch categoryList={platforms} categoryName="Platform" />
            <SelectSearch categoryList={modes} categoryName="Mode" />
            <TextSearch />
        </div>
    )
}

export default SearchOptions