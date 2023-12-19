import { IGame } from "@/lib/custom_types";
import Link from "next/link";

export default function ButtonConnect({ game }: { game: IGame }) {

    return (
        <button className="btn bg-green-600">
            <Link href={`/connect/${game.id}`}>Connect with players</Link>
        </button>
    )
}