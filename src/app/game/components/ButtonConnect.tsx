import Link from "next/link";

export default function ButtonConnect({ gameId }: { gameId: Number }) {

    return (
        <button className="btn">
            <Link href={`/connect/${gameId}`}>Connect with players</Link>
        </button>
    )
}