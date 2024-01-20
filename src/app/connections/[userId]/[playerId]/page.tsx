import { UserNotExist } from "@/lib/errors";
import { checkUserExistsAndReturn } from "@/lib/query_helper";
import Chat from "../../components/Chat";
import prisma from "@/lib/db";
import Form from "../../components/Form";
const crypto = require('crypto');

// stop page from caching (needed for real time chat (in prod))
export const dynamic = "force-dynamic";

export default async function PlayerChat({ params }: { params: { userId: string, playerId: string } }) {

    const userId = params.userId;
    const playerId = params.playerId;

    const player = await checkUserExistsAndReturn(playerId)
    const user = await checkUserExistsAndReturn(userId)

    if (player === null || user === null) {
        return <UserNotExist />
    }

    // create unique identifier from the user ids which is the same regardless of order
    function combineUniqueIds(id1: string, id2: string) {

        function hashString(inputString: string) {
            const hash = crypto.createHash('sha256');
            hash.update(inputString, 'utf-8');
            return hash.digest('hex');
        }

        // Hash the input strings
        const hashedId1 = hashString(id1);
        const hashedId2 = hashString(id2);

        // Convert the hashed strings to numbers (you may need a custom conversion method)
        const num1 = parseInt(hashedId1.substring(0, 15), 16);
        const num2 = parseInt(hashedId2.substring(0, 15), 16);

        // Check if the conversion is successful
        if (isNaN(num1) || isNaN(num2)) {
            console.error("Invalid input. Unable to convert to numbers.");
            return null;
        }

        // Perform addition on the converted numbers
        return num1 + num2;
    }

    const privateChatId = String(combineUniqueIds(userId, playerId)!)

    // create private chat room if it not already exists
    await prisma.chatPrivateRoom.upsert({
        where: { id: privateChatId },
        update: {},
        create: {
            id: privateChatId,
            user1Email: user.email!,
            user2Email: player.email!
        }
    });

    // get all messages between the user and the player
    const messages = await prisma.chatPrivateRoom.findUnique({
        where: { id: privateChatId },
        select: {
            messages: {
                select: {
                    message: true,
                    sentPrivateBy: { select: { userName: true } },
                    createdAt: true
                },
                take: 50,
                orderBy: { createdAt: "asc" }
            },
        },
    });

    return (
        <div id="player_chat_container" className=" h-full">
            <h1 className="text-2xl text-blue-600 tracking-wide pt-6 md:pt-16 ml-10 md:ml-20">
                {`${user.userName} and ${player.userName} chat`}
            </h1>
            <div id="layout-container_chat" className="p-8 md:p-20">
                <Chat messages={messages?.messages!} privateRoomId={privateChatId} />
                <Form privateRoomId={privateChatId} />
            </div>
        </div>
    )
}