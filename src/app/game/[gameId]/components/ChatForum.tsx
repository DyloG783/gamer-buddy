'use client'

import { sendMessageForum } from "@/actions"
import { useState } from "react"

type TForumMessages = {
    messages: ({
        sentBy: {
            userName: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        forumId: number;
        message: string;
        userId: string;
    })[];
} | null

export default function ChatForum({ messages, gameId }: { messages: TForumMessages, gameId: number }) {

    const [message, setMessage] = useState("")
    const [editing, setEditing] = useState(false)

    const closeInput = () => {
        setEditing(false);
        setMessage("");
    }

    // adds playerId to server actions
    const updateWithForumId = sendMessageForum.bind(null, gameId)

    // display initial messages
    // add for to submit messages
    return (
        <div id="chat_container" className="flex flex-col">
            <div id="message_container"
                className="max-h-96 overflow-y-scroll"
            >
                {messages && messages.messages.length > 0
                    &&
                    messages.messages.map((m) => (
                        <div key={`${m.createdAt}`} className="p-2">
                            <p className="font-light tracking-wider">{`${`${m.createdAt.getUTCDate()}/${m.createdAt.getUTCMonth() + 1}/${m.createdAt.getUTCFullYear()}`} ${m.sentBy.userName}`}</p>
                            <p>{`${m.message}`}</p>
                        </div>
                    ))
                    ||
                    <p className="p-2 tracking-wide font-light">Your're potentially the first person to leave a message... What an honor!</p>}
            </div>

            <form id="message_form" action={updateWithForumId}
                onSubmit={closeInput}
                className="p-4">
                <textarea
                    name="message_input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={() => setEditing(true)}
                    required
                    maxLength={500}
                    className={`w-full p-4 min-h-[50px]`}
                />
            </form>
            <div id="form_buttons" className="flex gap-2 mt-3 justify-end p-2">
                <button type="reset"
                    onClick={closeInput}
                    className={`btn bg-red-400 p-2
                    ${editing ? '' : 'hidden'}`}
                >
                    Cancel
                </button>
                <button type="submit" form="message_form"
                    className={`btn bg-green-500 p-2 ${editing ? '' : 'hidden'}`}

                >
                    Send
                </button>
            </div>
        </div>
    )
}