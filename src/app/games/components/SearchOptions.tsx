'use client'

import React, { useEffect, useState } from "react";
import { ISearchState, ISearchableGameType } from "@/lib/custom_types";
import Select from 'react-select';

interface ISearchOptionsProps {
    genres: ISearchableGameType[];
    platforms: ISearchableGameType[];
    modes: ISearchableGameType[];
    searchState: ISearchState;
    setSearchState: any;
    searchEmpty: boolean;
}

interface ISelectSearchProps {
    categoryList: ISearchableGameType[];
    categoryName: string;
}

const SearchOptions: React.FC<ISearchOptionsProps> = ({ genres, platforms, modes, searchState, setSearchState, searchEmpty }) => {
    const SelectSearch: React.FC<ISelectSearchProps> = ({ categoryList, categoryName }) => {

        const [categoryListSelection, setCategoryListSelection] = useState("default")

        useEffect(() => {
            if (categoryListSelection !== "default") {
                // console.log("Selection:", categoryListSelection)
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

        const handleSelect = (option: any) => {
            setCategoryListSelection(option.label);
        };

        return (
            <div className="flex flex-col gap-1 ">
                <h2 className="font-semibold p-1 text-blue-800">{categoryName}</h2>
                <Select
                    options={categoryList}
                    instanceId={`${categoryName}`}
                    onChange={handleSelect}
                    value={{
                        label: categoryName === "Genre" && searchState.genre != null ? searchState.genre
                            : categoryName === "Platform" && searchState.platform != null ? searchState.platform
                                : categoryName === "Mode" && searchState.mode != null ? searchState.mode
                                    : ""
                    }}
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            width: 250
                        }),
                    }}
                />

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
                <h2 className="font-semibold p-1 text-blue-800">Search</h2>
                <input
                    name="input"
                    placeholder={searchState.search ? searchState.search : "Search for game name"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleSubmit}
                    className=" placeholder:italic w-64 h-10 text-sm  border-2 border-slate-100 px-2"
                >
                </input>
            </div>
        )
    }

    return (
        <div id="search_options_and_reset_button"
            className="flex flex-col p-2 md:p-4"
        >
            {searchEmpty &&
                <button
                    id="reset_search"
                    onClick={() => window.location.reload()}
                    className="btn-primary ml-auto animate-bounce bg-amber-200 text-black"
                >
                    Reset search
                </button> ||
                <button
                    id="reset_search"
                    onClick={() => window.location.reload()}
                    className="btn-primary ml-auto"
                >
                    Reset search
                </button>
            }
            <div className="flex flex-wrap gap-3 justify-center mb-4 md:mb-8"
                id="search_options"
            >
                <SelectSearch categoryList={genres} categoryName="Genre" />
                <SelectSearch categoryList={platforms} categoryName="Platform" />
                <SelectSearch categoryList={modes} categoryName="Mode" />
                <TextSearch />
            </div>
            {/* <div id="search_state">
                Displaying searched games for Genre: {searchState.genre}
            </div> */}
        </div>
    )
}

export default SearchOptions