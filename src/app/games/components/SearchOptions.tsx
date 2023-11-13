'use client'

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

// this represent either genres, platforms, or modes which have the
// same data structure in the db
interface ISearchCategory {
    id: number;
    externalId: number;
    name: string;
}

interface ISearchOptionsProps {
    genres: ISearchCategory[];
    platforms: ISearchCategory[];
    modes: ISearchCategory[];
}

interface ISelectSearchProps {
    categoryList: ISearchCategory[];
    categoryName: string;
}

const SearchOptions: React.FC<ISearchOptionsProps> = ({ genres, platforms, modes }) => {


    const SelectSearch: React.FC<ISelectSearchProps> = ({ categoryList, categoryName }) => {

        const [categoryListSelection, setCategoryListSelection] = useState("")

        useEffect(() => {
            if (categoryListSelection != "") {
                console.log(`${categoryListSelection} selected in dropdown (<SearchOptions />)", ${categoryName}`)
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
                    {categoryList.map((listItem, index) =>
                        <option key={index} value={listItem.externalId} label={listItem.name}
                        // className="whitespace-nowrap overflow-hidden"
                        />
                    )}
                </select>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-4 justify-between">
            <SelectSearch categoryList={genres} categoryName="Genre" />
            <SelectSearch categoryList={platforms} categoryName="Platform" />
            <SelectSearch categoryList={modes} categoryName="Mode" />
            <div>
                <h2 className="font-bold p-1">Search</h2>
                <input placeholder="Search game title"></input>
            </div>
        </div>
    )
}

export default SearchOptions