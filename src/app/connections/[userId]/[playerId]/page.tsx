import { UserNotExist } from "@/lib/errors";
import { checkUserExistsAndReturn } from "@/lib/query_helper";
import Chat from "../../components/Chat";
import prisma from "@/lib/db";
import Form from "../../components/Form";
const crypto = require('crypto');

// stop page from caching (needed for real time chat (in prod))
export const dynamic = "force-dynamic";

export default async function PlayerChat({ params }: { params: { userId: string, playerId: string } }) {

    const player = await checkUserExistsAndReturn(params.playerId);
    const user = await checkUserExistsAndReturn(params.userId);

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

    const privateChatId = String(combineUniqueIds(params.userId, params.playerId)!)

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
                    id: true,
                    message: true,
                    sentPrivateBy: { select: { userName: true } },
                    receiverId: true,
                    createdAt: true,
                    seen: true
                },
                orderBy: { createdAt: "asc" }
            },
        },
    });

    // update messages as 'seen' for new mesages since this page was last loaded(not real time)
    if (messages) {
        for (const m of messages.messages) {
            if (m.receiverId === user.id && m.seen === false) {
                await prisma.privateMessage.update({
                    where: { id: m.id },
                    data: {
                        seen: true
                    }
                })
            }
        }
    }

    return (
        <div id="player_chat_container" className="full-height-minus-nav background-color dark:bg-black
        flex flex-col justify-between">
            <h1 className="text-2xl text-blue-600 tracking-wide pt-6 md:pt-16 ml-10 md:ml-20">
                {`${user.userName} and ${player.userName} chat`}
            </h1>
            <div id="layout-container_chat" className="p-8 md:p-20 h-full">
                <Chat messages={messages?.messages!} privateRoomId={privateChatId} />
                <Form privateRoomId={privateChatId} playerId={params.playerId} />
            </div>
        </div>
    )
}