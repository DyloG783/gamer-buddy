import { UserNotExist } from "@/lib/errors";
import { checkUserExistsAndReturn } from "@/lib/query_helper";
import Chat from "../../components/Chat";
import prisma from "@/lib/db";

export default async function PlayerChat({ params }: { params: { userId: string, playerId: string } }) {

    const userId = params.userId;
    const playerId = params.playerId;

    const player = await checkUserExistsAndReturn(playerId)
    const user = await checkUserExistsAndReturn(userId)

    if (player === null || user === null) {
        return <UserNotExist />
    }

    // get all messages between the user and the player
    const messages = await prisma.privateMessage.findMany({
        where: {
            OR: [
                {
                    sentById: { contains: userId },
                    recievedById: { contains: playerId },
                },
                {
                    sentById: { contains: playerId },
                    recievedById: { contains: userId },
                },
            ]
        },
        include: {
            sentBy: { select: { userName: true } },
            recievedBy: { select: { userName: true } }
        },
        orderBy: { createdAt: "desc" }
    })


    return (
        <div id="player_chat_container" className="">
            <h1 className="text-2xl text-blue-600 tracking-wide mt-10 ml-10 md:mt-20 md:ml-20">
                {`${user.userName} and ${player.userName} chat`}
            </h1>
            <div id="layout-container_chat" className="p-8 md:p-20">
                <Chat playerId={`${playerId}`} messages={messages} />
            </div>
        </div>
    )
}