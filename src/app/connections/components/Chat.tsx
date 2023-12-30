'use client'

import { sendMessagePrivate } from "@/actions"
import { useEffect, useState } from "react"

type TMessage = ({
    sentBy: {
        userName: string | null;
    };
    recievedBy: {
        userName: string | null;
    };
} & {
    createdAt: Date,
    sentById: string,
    recievedById: string,
    message: string
})

export default function Chat({ messages, playerId }:
    { messages: TMessage[], playerId: string }) {

    const [message, setMessage] = useState("")
    const [editing, setEditing] = useState(false)

    // FML!!! can't scroll to bottom of scrollable div...
    // const ref = document.getElementById('message_container');
    // useEffect(() => {
    //     // const messageView = document.getElementById('message_container');
    //     console.log(ref)
    //     if (ref.c) {
    //         if (ref) {
    //             setTimeout(() => {
    //                 ref.scrollIntoView({ behavior: "auto", block: "end" });
    //             }, 100);
    //         }


    //     }
    // }, [])

    const closeInput = () => {
        setEditing(false);
        setMessage("");
    }

    // adds playerId to server actions
    const updateWithPlayerId = sendMessagePrivate.bind(null, playerId)

    return (
        <div id="chat_container" className="flex flex-col">
            <div id="message_container"
                className="max-h-40 md:max-h-80 overflow-y-scroll"
            >
                {messages && messages.length > 0 &&
                    messages.map((m) => (
                        <div key={`${m.createdAt}`} className="p-2">
                            <p className="font-light tracking-wider">{`${`${m.createdAt.getUTCDate()}/${m.createdAt.getUTCMonth() + 1}/${m.createdAt.getUTCFullYear()}`} ${m.sentBy.userName}`}</p>
                            <p>{`${m.message}`}</p>
                        </div>
                    ))}
            </div>

            <form id="message_form" action={updateWithPlayerId}
                onSubmit={closeInput}
                className="p-4">
                <input
                    name="message_input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={() => setEditing(true)}
                    required
                    maxLength={500}
                    className={`w-full p-4 min-h-[100px]`}
                />
            </form>
            <div id="form_buttons" className="flex gap-2 mt-3 justify-end p-2">
                {/* <span className={`${inputValid ? 'hidden' : ''} text-red-400 mb-2`}> 10 - 500 characters</span> */}
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