'use client'

import { useEffect, useRef, useState } from "react"
import Pusher from "pusher-js"

type TMessage = ({
    sentPrivateBy: {
        userName: string | null;
    };
    message: string;
})

export default function Chat({ messages, privateRoomId }: { messages: TMessage[], privateRoomId: string }) {

    const [totalMessages, settotalMessages] = useState(messages || [])
    const messageEndRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        // Pusher channel setup get game for group chat
        var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
            cluster: 'ap1'
        });
        var channel = pusher.subscribe(`${privateRoomId}`);
        channel.bind('private-room-post', function (data: any) {
            const parsedMessage = JSON.parse(data.message);
            settotalMessages((prev) => [...prev, parsedMessage]);
        });

        return () => {
            pusher.unsubscribe(`${privateRoomId}`);
        };
    }, [privateRoomId]);

    const scrollTobottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollTobottom();
    }, [totalMessages]);

    return (
        <div id="chat_container" className="flex flex-col">
            <div id="message_container"
                className="max-h-40 md:max-h-80 overflow-y-scroll"
            >
                {totalMessages && totalMessages.length > 0 &&
                    totalMessages.map((m, index) => (
                        <div key={index} className="p-2">
                            {/* <p className="font-light tracking-wider">{`${`${m.createdAt.getUTCDate()}/${m.createdAt.getUTCMonth() + 1}/${m.createdAt.getUTCFullYear()}`} ${m.sentBy.userName}`}</p> */}
                            <p className="font-light tracking-wider">{`${m.sentPrivateBy.userName}`}</p>
                            <p>{`${m.message}`}</p>
                        </div>
                    ))}
                <div ref={messageEndRef}></div>
            </div>
        </div>
    )
}