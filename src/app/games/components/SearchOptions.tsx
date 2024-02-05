'use client'

import React, { useEffect, useState } from "react";
import { ISearchState, ISearchableGameType } from "@/lib/custom_types";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

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

        const [categoryListSelection, setCategoryListSelection] = useState("Default")

        useEffect(() => {
            if (categoryListSelection !== "Default") {
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

        const handleSelect = (e: any) => {
            setCategoryListSelection(e.target.value);
        };

        return (
            <div className="flex flex-col gap-1 ">
                <h2 className="font-semibold blue-font">{categoryName}</h2>
                <Select
                    label={categoryName === "Genre" && searchState.genre != null ? searchState.genre
                        : categoryName === "Platform" && searchState.platform != null ? searchState.platform
                            : categoryName === "Mode" && searchState.mode != null ? searchState.mode
                                : categoryListSelection}
                    placeholder={`Select a ${categoryName}`}
                    aria-label={categoryName}
                    value={categoryListSelection}
                    selectedKeys={[categoryListSelection]}
                    onChange={handleSelect}
                    size='lg'
                    className={`min-w-60 max-w-sm`}
                >
                    {categoryList.map((cat) =>
                        <SelectItem key={cat.label} value={cat.label}>
                            {cat.label}
                        </SelectItem>
                    )}
                </Select>
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
                <h2 className="font-semibold text-blue-800">Search</h2>
                <Input
                    name="input"
                    label={searchState.search ? searchState.search : "Search for game name"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleSubmit}
                    isClearable
                    onClear={() => setInput("")}
                    size="lg"
                >
                </Input>
            </div>
        )
    }

    return (
        <div id="search_options_and_reset_button"
            className="flex flex-col p-2"
        >
            {searchEmpty &&
                <Button
                    id="reset_search"
                    onClick={() => window.location.reload()}
                    data-testid={'reset_search'}
                    size='lg'
                    className="text-sm tracking-wider ml-auto animate-bounce bg-amber-200 text-black"
                >
                    Reset search
                </Button> ||
                <Button
                    id="reset_search"
                    onClick={() => window.location.reload()}
                    color='primary'
                    data-testid={'reset_search'}
                    size='lg'
                    className={`text-sm tracking-wider ml-auto`}
                >
                    Reset search
                </Button>
            }
            <div className="flex flex-wrap gap-3 lg:gap-6 xl:gap-10 mb-4 md:mb-8 p-4"
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