import prisma from "@/lib/db"
import ButtonAddGame from "@/app/game/components/ButtonAddGame";
import ButtonRemoveGame from "@/app/game/components/ButtonRemoveGame";
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

    // the game selected from the games page
    let game;

    // boolean for whether the user already has this game added to their account
    let alreadyExists = false;

    // retrieve game from db
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

    // return not found in case a user enters a random number through url
    if (!game) {
        return (<p>Game not found</p>)
    }

    // retrieve user's array of saved games (game external id's)
    // if user already has game in array set alreadyExists = true
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
            alreadyExists = true;
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
                {alreadyExists
                    && <ButtonRemoveGame gameId={gameId} userEmail={user?.email} />
                    || <ButtonAddGame gameId={gameId} userEmail={user?.email} />
                }

            </div>
        </div>
    )
}