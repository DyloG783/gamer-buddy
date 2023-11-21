import prisma from "@/lib/db"
import ButtonAddGame from "@/app/game/components/ButtonAddGame";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function GamePage({ params }: { params: { id: number } }) {

    const gameId = Number(params.id) // this id passed in params is the game's ExternalID(for referential integrity)

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    })

    let game;
    let exists = false;

    try {
        game = await prisma.game.findUnique({
            where: {
                externalId: gameId
            }
        })
    }
    catch (error) {
        console.log("Failed looking up game id in database, returning bare game:", error)
        return (
            <div id="failureDiv">
                {`No game found in database; gameId: ${gameId}; game returned: ${game}`}
            </div>
        )
    }

    if (!game) {
        return (<p>Game not found</p>)
    }

    try {
        const usersGames = await prisma.user.findFirst({
            where: {
                email: user?.email
            },
            select: {
                games: true
            }
        })

        if (usersGames?.games.includes(gameId)) {
            exists = true;
        }

    } catch (error) {
        console.log("Failed looking up existing game on user", error)
    }

    return (
        <div id="game_Info_View" className={`flex m-2 justify-between shadow-sm`}>
            <div className="">
                <div className="pb-4">
                    <p className="font-bold">Name</p>
                    <p className="italic">{`${game?.name}`}</p>
                </div>
                <div className="pb-4">
                    <p className="font-bold">Genre</p>
                    {game?.gameGenreNames.map((genre: string) => (
                        <span key={genre} className="italic">{genre + ", "}</span>
                    ))}
                </div>
                <div className="pb-4">
                    <p className="font-bold">Mode</p>
                    {game?.gameModeNames.map((mode: string) => (
                        <span key={mode} className="italic">{mode + ", "}</span>
                    ))}
                </div>
                <div className="pb-4">
                    <p className="font-bold">Platform</p>
                    {game?.platformNames.map((plat: string) => (
                        <span key={plat} className="italic">{plat + ", "}</span>
                    ))}
                </div>
                <div className="pb-4">
                    <p className="font-bold">Link to IGBD game site</p>
                    <Link href={`${game?.url}`} className="italic text-purple-700"
                        target="_blank"
                    >
                        {`${game?.url}`}
                    </Link>
                </div>
                <div className="pb-4 max-w-4xl">
                    <p className=" font-bold">Summary</p>
                    <p className=" italic">{`${game?.summary}`}</p>
                </div>
            </div>
            <div>
                <ButtonAddGame gameId={gameId} exists={exists} />
            </div>
        </div>
    )
}