export default async function PlayerChat({ params }: { params: { slug: [gameId: number, playerId: string, userID: string] } }) {

    const gameId = Number(params.slug[0]);
    const playerId = params.slug[1];
    const userId = params.slug[2];

    return (
        <div id="player_chat_container" className="w-full">
            PlayerChat page
            <div>
                {gameId}
            </div>
            <div>
                {playerId}
            </div>
            <div>
                {userId}
            </div>
        </div>

    )
}