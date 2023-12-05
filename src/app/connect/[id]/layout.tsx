import Link from "next/link";


export default function ConnectLayout({ children, params, }: { children: React.ReactNode, params: { id: string } }) {

    // convert game id param from string to number to use in prisma query
    const gameId = Number(params.id);

    return (
        <div>
            <Link href={`/game/${gameId}`}>placeholder title link back to game</Link>
            {children}
        </div>
    )
}