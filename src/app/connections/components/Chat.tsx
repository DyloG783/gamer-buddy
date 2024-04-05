'use client'

import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { ScrollShadow } from "@nextui-org/react";

type TMessage = {
    sentPrivateBy: {
        userName: string | null;
    };
    message: string;
    createdAt: Date;
};

export default function Chat({ messages, privateRoomId }: { messages: TMessage[], privateRoomId: string }) {

    const [totalMessages, settotalMessages] = useState(messages || [])
    const messageEndRef = useRef<HTMLInputElement>(null);

    useEffect(() => {

        // Pusher channel setup get game for private chat
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
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollTobottom();
    }, [totalMessages]);

    // used for localDate to convert date saved in db to something that won't crash on render
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        hour: "numeric",
        minute: "numeric"
    };

    return (
        <div id="chat_container" className="flex flex-col">
            <ScrollShadow className="w-full max-h-[400px] md:max-h-[600px]">
                {totalMessages && totalMessages.length > 0 &&
                    totalMessages.map((m, index) => (
                        <div key={index} className="p-2">
                            <span className="text-emerald-600 tracking-wider mr-2">{m.sentPrivateBy.userName}</span>
                            <span className="font-light text-sm italic" suppressHydrationWarning>{m.createdAt ? m.createdAt.toLocaleString(undefined, options) : new Date().toLocaleDateString(undefined, options)}</span>
                            <p>{`${m.message}`}</p>
                        </div>
                    ))}
                <div ref={messageEndRef}></div>
            </ScrollShadow>
        </div>
    )
}