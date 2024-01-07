'use client'

import { useEffect, useRef, useState } from "react"
import Pusher from "pusher-js"

type TForumMessages = {
    messages: {
        id: string;
        sentGameBy: {
            userName: string | null;
        };
        message: string;
    }[];
} | null



export default function ChatForum({ roomMessages, gameRoomId }: { roomMessages: TForumMessages, gameRoomId: string }) {

    const [totalMessages, settotalMessages] = useState(roomMessages?.messages || [])
    const messageEndRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        // Pusher channel setup get game for group chat
        var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe(`${gameRoomId}`);

        channel.bind('game-room-post', function (data: any) {
            const parsedMessage = JSON.parse(data.message);
            settotalMessages((prev) => [...prev, parsedMessage]);
        });

        return () => {
            pusher.unsubscribe(`${gameRoomId}`);
        };
    }, []);

    const scrollTobottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollTobottom();
    }, [totalMessages]);

    return (
        <div id="chat_container" className="flex flex-col">
            <div id="message_container"
                className="max-h-96 overflow-y-scroll"
            >
                {totalMessages && totalMessages.length > 0
                    &&
                    totalMessages.map((message, index) => (
                        <div key={index} className="p-2">
                            {/* <p className="font-light tracking-wider">{`${`${m.createdAt.getUTCDate()}/${m.createdAt.getUTCMonth() + 1}/${m.createdAt.getUTCFullYear()}`} ${m.sentGameBy.userName}`}</p> */}
                            <p className="font-light tracking-wider">{`${message.sentGameBy.userName}`}</p>
                            <p>{`${message.message}`}</p>
                        </div>
                    ))
                    ||
                    <p className="p-2 tracking-wide font-light">Your're potentially the first person to leave a message... What an honor!</p>
                }
                <div ref={messageEndRef}></div>
            </div>
        </div>
    )
}