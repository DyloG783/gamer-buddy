import prisma from "@/lib/db"
import ButtonAddGame from "@/app/game/components/ButtonAddGame";

export default async function GamePage({ params }: { params: { id: number } }) {

    const gameId = Number(params.id)
    let game;

    try {
        game = await prisma.game.findUnique({
            where: {
                id: gameId
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

    if (game === undefined) {
        return (<p>Game not found</p>)
    }

    return (
        <div id="game_Info_View" className={`flex m-2 justify-between shadow-sm`}>
            <div className="">
                <div className="pb-4">
                    <p className="font-bold">Name</p>
                    <p className="italic">{`${game?.name}`}</p>
                </div>
                <div className="pb-4">
                    <p className="font-bold">Link to IGBD game site</p>
                    <p className=" italic">{`${game?.url}`}</p>
                </div>
                <div className="pb-4 max-w-4xl">
                    <p className=" font-bold">Summary</p>
                    <p className=" italic">{`${game?.summary}`}</p>
                </div>
            </div>
            <div>
                <ButtonAddGame />
            </div>
        </div>
    )
}