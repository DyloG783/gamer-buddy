import prisma from "@/lib/db"

export default async function Id({ params }: { params: { id: number } }) {

    const gameId = Number(params.id)
    let game;

    try {
        game = await prisma.game.findUnique({
            where: {
                id: gameId
            }
        })

        return (
            <div className="grow flex ">
                <div className="game_Info_View">
                    {`In Game page: ${game?.id} ${game?.name} [background_image_placeholder?]`}
                </div>
                <div>
                    Connections
                </div>

            </div>
        )

    }
    catch (error) {
        console.log("Failed looking up game id in database, returning bare game:", error)
        return (
            <div className="failureDiv">
                {`No game found in database; gameId: ${gameId}; game returned: ${game}`}
            </div>
        )
    }
}