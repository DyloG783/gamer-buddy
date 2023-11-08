'use client'

import { Key, useState } from "react";
import ReactPaginate from "react-paginate";

interface IGame {
    id: number;
    externalId: number;
    name: string;
    summary: string | null;
    url: string | null;
    platforms: number[];
    gameModes: number[];
    genres: number[];
}

interface IGameProps {
    allGames: IGame[]
}

const AllGames: React.FC<IGameProps> = ({ allGames }) => {

    function Items({ currentItems }: { currentItems: IGame[] }) {
        return (
            <div className="grid grid-flow-col">
                {currentItems &&
                    currentItems.map((game: IGame, index: Key) => (
                        <div key={index} className="border-gray-800 border-2">
                            <h3 className="font-bold pb-2">{game.name}</h3>
                            <label className="italic ">{game.summary}</label>
                        </div>
                    ))}
            </div>
        );
    }

    function PaginatedItems({ itemsPerPage }: { itemsPerPage: number }) {
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = allGames.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(allGames.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event: any) => {
            const newOffset = (event.selected * itemsPerPage) % allGames.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };
        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="flex justify-center gap-3 py-2"
                />
            </>
        );
    }

    return (
        <div className="border-neutral-500 border-2">
            <div className="text-center pb-2">All Games</div>
            <PaginatedItems itemsPerPage={3} />
        </div>
    )
}

export default AllGames;