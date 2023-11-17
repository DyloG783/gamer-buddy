'use client'

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

// this represents either genres, platforms, or modes which have the
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
}

interface ISelectSearchProps {
    categoryList: ISearchableGameType[];
    categoryName: string;
}

const SearchOptions: React.FC<ISearchOptionsProps> = ({ genres, platforms, modes }) => {

    const SelectSearch: React.FC<ISelectSearchProps> = ({ categoryList, categoryName }) => {

        const [categoryListSelection, setCategoryListSelection] = useState("")

        useEffect(() => {
            if (categoryListSelection != "") {
                redirect(`/games/${categoryName.toLowerCase()}/${categoryListSelection}`)
            }
        }, [categoryListSelection])

        const handleSubmit = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setCategoryListSelection(e.target.value)
        }

        return (
            <div className="flex flex-col gap-2">
                <h2 className="font-bold p-1">{categoryName}</h2>
                <select
                    onChange={e => handleSubmit(e)}
                    value={categoryListSelection}
                    className="w-56"
                >
                    {/* <option disabled hidden label={undefined} /> */}
                    {categoryList.map((listItem) =>
                        <option key={listItem.externalId} value={listItem.externalId} label={listItem.name}
                        // className="whitespace-nowrap overflow-hidden"
                        />
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
                redirect(`/games/search/${submitText}`)
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
                    placeholder="Search game title"
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